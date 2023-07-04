const Article = require('../models/Article');
const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('Error deleting file:' + filePath, err);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
  };

// Add new article
const addArticle = async (req, res) => {
    try{
        const { title, description, content, userId } = req.body;

        if (!title || !description || !content || !userId || !req.files || req.files.length === 0) {
            console.log("Missing data or photos!");
            // Delete updated file
            if (req.files && req.files.length > 0) {
              req.files.forEach(file => fs.unlinkSync(file.path));
            }
            return res.sendStatus(400);
        }else{
            const images = req.files ? req.files.map(file => ({ url: file.path, isMain: false })) : [];
            // Set first image as main
            if (images.length > 0) {
                images[0].isMain = true;
            }else{
                console.log("Missing data - no photos!");
                return res.sendStatus(400);
            }
        
            const newArticle = new Article({
                title: title, 
                description: description, 
                content: content, 
                images: images, 
                createdAt: new Date(), 
                userId: userId
            });
            await newArticle.save();

            res.status(201).json(newArticle);
        }

    }catch(err){
        console.log('Error adding new article:', err);
        return res.status(500).json({ err: 'Failed to add new article' });
    }
}

// Edit already exist article
const editArticle = async (req, res) => {
    try{
        const { id: articleId } = req.params;
        const { title, description, content, userId } = req.body;

        // Changed to edit only content of article
        // const images = req.files.map(file => ({ url: file.path, isMain: false }));

        if(!title || !description || !content){
            console.log("Missing data!");
            return res.sendStatus(400);

        }else{
            if(userId){
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { title: title, description: description, content: content, userId: userId },
                    { new: true }
                );
                res.status(201).json(updatedArticle);                
            }else{
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { title: title, description: description, content: content },
                    { new: true }
                );
                res.status(201).json(updatedArticle);
            }
        }
    }catch(err){
        console.log('Error updating article:', err);
        return res.status(500).json({ err: 'Failed to update article' });
    }
}

// Read all articles
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}, 'title description images.url').lean();
        articles.forEach(article => {
            if (article.images.length > 0) {
              article.imageUrl = article.images[0].url;
              delete article.images;
            }
        });
        res.status(200).json(articles);
    }catch(err){
    console.log('Error fetching articles:', err);
    return res.status(500).json({ err: 'Failed to fetch articles' });
    }
}

// Read single article
const getArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
            console.log('Article not found');
            return res.sendStatus(404);
        }
        res.status(200).json(article);
    }catch(err){
        console.log('Error fetching article:', err);
        return res.status(500).json({ err: 'Failed to fetch article' });
    }
}

// Delete an article
const deleteArtcile = async (req, res) => {
    try {
        const { id } = req.params;

        // Read an article that you want to delete
        const article = await Article.findById(id);

        // If exist delete images from an article
        if (article) {
            // Read array with images urls
            const imageUrls = article.images.map((image) => image.url);

            // Delete an image from server
            imageUrls.forEach((imageUrl) => {
                deleteFile(imageUrl);
            });

            // Remove aricle from DB
            await Article.findByIdAndRemove(id);
            res.status(200).json({ message: 'Article deleted successfully' });
        }else{
            console.log('Article not found');
            return res.sendStatus(404);
        }


    }catch(err){
        console.log('Error deleting article:', err);
        return res.status(500).json({ err: 'Failed to delete article' });
    }
}

// Add new image to article
const addImageToArticle = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, req.files, req.files.length);
        if(id && req.files && req.files.length > 0){
            const images = req.files.map(file => ({ url: file.path, isMain: false }));
        
            const existingArticle = await Article.findById(id);
            if (!existingArticle) {
                console.log('Article not found');
                return res.sendStatus(404);
            }
        
            if (existingArticle.images.length === 0) {
              images[0].isMain = true;
            }
    
            existingArticle.images.push(...images);
            await existingArticle.save();
        
            res.status(200).json(existingArticle);
        }else{
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => fs.unlinkSync(file.path));
            }
            console.log("Missing id or photos!");
            return res.sendStatus(400)
        }
    }catch(err){
        console.log('Error adding image to article:', err);
        return res.status(500).json({ err: 'Failed to add image to article' });
    }
}

// Delete image from an article
const deleteImageFromArticle = async (req, res) => {
    try {
        const { articleId, imageId } = req.params;

        if(articleId && imageId){

            // Read the article from which you want to remove an image
            const article = await Article.findById(articleId);

            // If exist delete images from an article
            if (article) {
                let isImageFound = false;
                // Read array with images urls
                article.images.forEach(async (image) => {
                    if (image.id === imageId) {
                        // Delete the image from the server
                        deleteFile(image.url);
                        isImageFound = true;
                    }
                });
                if (isImageFound) {
                    const updatedArticle = await Article.findByIdAndUpdate(
                        articleId,
                        { $pull: { images: { _id: imageId } } },
                        { new: true }
                    );
                    res.status(200).json(updatedArticle);
                }else{
                    console.log('Image not found');
                    return res.sendStatus(404);
                }
            }else{
                console.log('Article not found');
                return res.sendStatus(404);
            }
        }else{
            console.log("Missing articleId or imageId!");
            return res.sendStatus(400)
        }   

    }catch(err){
        console.log('Error removing image from article:', err);
        return res.status(500).json({ err: 'Failed to remove image from article' });
    }
}

module.exports = {
    addArticle: addArticle,
    editArticle: editArticle,
    getArticles: getArticles,
    getArticle: getArticle,
    deleteArtcile: deleteArtcile,
    addImageToArticle: addImageToArticle,
    deleteImageFromArticle: deleteImageFromArticle
}
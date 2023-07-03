const Article = require('../models/Article');
const multer = require('multer');

// Add new article
const addArticle = async (req, res) => {
    try{
        const { title, description, content, userId } = req.body;
        const images = req.files.map(file => ({ url: file.path, isMain: false }));

        if(title || description || content || userId || images){

            // Set first image as main
            if (images.length > 0) {
                images[0].isMain = true;
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
        }else{
            console.log("Brakujace dane");
            res.sendStatus(400);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

// Edit already exist article
const editArticle = async (req, res) => {
    try{
        const { articleId } = req.params;
        const { title, description, content, userId } = req.body;
        const images = req.files.map(file => ({ url: file.path, isMain: false }));
    
        if(images){
            if(title || description || content){
                // Set first image as main
                if (images.length > 0) {
                    images[0].isMain = true;
                }
            
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { title: title, description: description, content: content, images: images, userId: userId },
                    { new: true }
                );
                res.status(201).json(updatedArticle);
            }else{
                // Set first image as main
                if (images.length > 0) {
                    images[0].isMain = true;
                }
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { images: images },
                    { new: true }
                );
                res.status(201).json(updatedArticle);
            }
        }else{
            if(title || description || content){
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { title: title, description: description, content: content, userId: userId },
                    { new: true }
                );
                res.status(201).json(updatedArticle);
            }else{
                console.log("Brakujace dane");
                res.sendStatus(400);
            }
        }
    }catch(err){
        console.log('Error updating article:', err);
        res.status(500).json({ err: 'Failed to update article' });
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
      } catch (err) {
        console.log('Error fetching articles:', err);
        res.status(500).json({ err: 'Failed to fetch articles' });
      }
}

// Read single article
const getArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
          return res.status(404).json({ err: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (err) {
        console.log('Error fetching article:', err);
        res.status(500).json({ err: 'Failed to fetch article' });
    }
}

// Delete an article
const deleteArtcile = async (req, res) => {
    try {
        const { id } = req.params;
        await Article.findByIdAndRemove(id);
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (err) {
        console.error('Error deleting article:', err);
        res.status(500).json({ err: 'Failed to delete article' });
    }
}

// Add new image to article
const addImageToArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const images = req.files.map(file => ({ url: file.path, isMain: false }));
    
        const existingArticle = await Article.findById(id);
        if (!existingArticle) {
          return res.status(404).json({ error: 'Article not found' });
        }
    
        let isMainImageSet = false;
        if (existingArticle.images.length === 0) {
          images[0].isMain = true;
          isMainImageSet = true;
        }
    
        const updatedImages = isMainImageSet ? images : [existingArticle.images[0], ...images];
        existingArticle.images.push(...updatedImages);
        await existingArticle.save();
    
        res.status(200).json(existingArticle);
      } catch (err) {
        console.log('Error adding image to article:', err);
        res.status(500).json({ err: 'Failed to add image to article' });
      }
}

// Delete image from an article
const deleteImageFromArticle = async (req, res) => {
    try {
        const { articleId, imageId } = req.params;
    
        const updatedArticle = await Article.findByIdAndUpdate(
          articleId,
          { $pull: { images: { _id: imageId } } },
          { new: true }
        );
    
        res.status(200).json(updatedArticle);
    } catch (err) {
        console.error('Error removing image from article:', err);
        res.status(500).json({ err: 'Failed to remove image from article' });
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
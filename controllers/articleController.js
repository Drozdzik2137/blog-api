const Article = require('../models/Article');
const fs = require('fs');
const User = require('../models/User');

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
        const userId = req.user.id;
        const { title, description, content, isPublic } = req.body;

        const findUser = await User.findById(userId);

        if(findUser.role != 101 && findUser.role != 1001){
            console.log("Unauthorized!");
            // Delete updated thumbnail
            if (req.files.thumbnail && req.files.thumbnail.length > 0) {
                req.files.thumbnail.forEach(file => fs.unlinkSync(file.path));
            }
            // Delete updated image
            if (req.files.image && req.files.image.length > 0) {
                req.files.image.forEach(file => fs.unlinkSync(file.path));
            }
            return res.sendStatus(403);
        }

        if (!title || !description || !content || !userId || !req.files) {
            console.log("Missing data or photos!");
            // Delete updated thumbnail
            if (req.files.thumbnail && req.files.thumbnail.length > 0) {
                req.files.thumbnail.forEach(file => fs.unlinkSync(file.path));
            }
            // Delete updated image
            if (req.files.image && req.files.image.length > 0) {
                req.files.image.forEach(file => fs.unlinkSync(file.path));
            }
            return res.sendStatus(400);
        }else{
            const images = req.files.image ? req.files.image.map(file => ({ url: file.path })) : [];
            const thumbnail = req.files.thumbnail ? req.files.thumbnail.map(file => ({ url: file.path })) : [];
            const links = req.body.link ? req.body.link : [];
            // Set first image as main
            if (!thumbnail.length > 0) {
                console.log("Missing data - no thumbnail!");
                return res.sendStatus(400);
            }
        
            const newArticle = new Article({
                title: title, 
                description: description, 
                content: content, 
                thumbnail: thumbnail,
                images: images,
                links: links, 
                createdAt: new Date(), 
                userId: userId,
                isPublic: Boolean(isPublic)
            });
            
            findUser.articles.push(newArticle._id);

            await newArticle.save();
            await findUser.save();
            res.status(201).json(newArticle);
        }

    }catch(err){
        // Delete updated thumbnail
        if (req.files.thumbnail && req.files.thumbnail.length > 0) {
            req.files.thumbnail.forEach(file => fs.unlinkSync(file.path));
        }
        // Delete updated image
        if (req.files.image && req.files.image.length > 0) {
            req.files.image.forEach(file => fs.unlinkSync(file.path));
        }
        console.log('Error adding new article:', err);
        return res.status(500).json({ error: 'Failed to add new article' });
    }
}

// Edit already exist article
const editArticle = async (req, res) => {
    try{
        const userId = req.user.id;
        const { id: articleId } = req.params;
        const { title, description, content, isPublic } = req.body;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");
            return res.sendStatus(403);
        }

        // Changed to edit only content of article
        // const images = req.files.map(file => ({ url: file.path, isMain: false }));

        if(!title || !description || !content){
            console.log("Missing data!");
            return res.sendStatus(400);
        }else{
            const links =  req.body.link ? req.body.link : [];

            const findArticle = await Article.findById(articleId);

            if(!findArticle){
                console.log("Article not exist!");
                return res.sendStatus(404);
            }

            if(links.length > 0){
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { title: title, description: description, content: content, links: links, userId: userId, isPublic },
                    { new: true }
                );
                res.status(201).json(updatedArticle);                    
            }else{
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { title: title, description: description, content: content, userId: userId, isPublic },
                    { new: true }
                );
                res.status(201).json(updatedArticle);    
            }
        }
    }catch(err){
        console.log('Error updating article:', err);
        return res.status(500).json({ error: 'Failed to update article' });
    }
}

// Read all public articles
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({ isPublic: true }, 'title description thumbnail isPublic userId createdAt')
            .populate({ path: 'userId', select: 'firstName lastName'})
            .lean();

        const transformedArticles = articles.map(article => ({
            _id: article._id,
            title: article.title,
            description: article.description,
            thumbnail: article.thumbnail,
            isPublic: Boolean(article.isPublic),
            createdAt: article.createdAt,
            author: {
                id: article.userId._id,
                firstName: article.userId.firstName,
                lastName: article.userId.lastName
            }
        }));
        res.status(200).json(transformedArticles);
    }catch(err){
        console.log('Error fetching articles:', err);
        return res.status(500).json({ error: 'Failed to fetch articles' });
    }
}

// Read single public article
const getArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id).populate('userId', 'firstName lastName').lean();
        
        if(!article.isPublic){
            console.log("Unauthorized!");
            return res.sendStatus(403);
        }
        if (!article) {
            console.log('Article not found');
            return res.sendStatus(404);
        }
        const transformedArticle = {
            _id: article._id,
            title: article.title,
            description: article.description,
            content: article.content,
            thumbnail: article.thumbnail,
            images: article.images,
            links: article.links,
            isPublic: article.isPublic,
            createdAt: article.createdAt,
            author: {
                id: article.userId._id,
                firstName: article.userId.firstName,
                lastName: article.userId.lastName
            }
        };
        res.status(200).json(transformedArticle);
    }catch(err){
        console.log('Error fetching article:', err);
        return res.status(500).json({ error: 'Failed to fetch article' });
    }
}

// Read all public articles (public and private for admin)
const getArticlesForAdmin = async (req, res) => {
    try {
        const userId = req.user.id;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");            
            return res.sendStatus(403);
        }
        
        const articles = await Article.find({}, 'title description thumbnail isPublic userId createdAt')
            .populate({ path: 'userId', select: 'firstName lastName'})
            .lean();

        const transformedArticles = articles.map(article => ({
            _id: article._id,
            title: article.title,
            description: article.description,
            thumbnail: article.thumbnail,
            isPublic: article.isPublic,
            createdAt: article.createdAt,
            author: {
                id: article.userId._id,
                firstName: article.userId.firstName,
                lastName: article.userId.lastName
            }
        }));
        res.status(200).json(transformedArticles);
    }catch(err){
        console.log('Error fetching articles:', err);
        return res.status(500).json({ error: 'Failed to fetch articles' });
    }
}

// Read single article (public and private for admin)
const getArticleForAdmin = async (req, res) => {
    try {
        const userId = req.user.id;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");
            return res.sendStatus(403);
        }

        const { id } = req.params;
        const article = await Article.findById(id).populate('userId', 'firstName lastName').lean();

        if (!article) {
            console.log('Article not found');
            return res.sendStatus(404);
        }

        const transformedArticle = {
            _id: article._id,
            title: article.title,
            description: article.description,
            content: article.content,
            thumbnail: article.thumbnail,
            images: article.images,
            links: article.links,
            isPublic: article.isPublic,
            createdAt: article.createdAt,
            author: {
                id: article.userId._id,
                firstName: article.userId.firstName,
                lastName: article.userId.lastName
            }
        };
        res.status(200).json(transformedArticle);
    }catch(err){
        console.log('Error fetching article:', err);
        return res.status(500).json({ error: 'Failed to fetch article' });
    }
}

// Delete an article
const deleteArtcile = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");
            // Delete updated file
            if (req.files && req.files.length > 0) {
              req.files.forEach(file => fs.unlinkSync(file.path));
            }
            return res.sendStatus(403);
        }

        // Read an article that you want to delete
        const article = await Article.findById(id);

        // If exist delete images from an article
        if (article) {
            // Read array with thumbnail urls
            const thumbnailUrls = article.thumbnail.map((thumbnail) => thumbnail.url);

            // Read array with images urls
            const imageUrls = article.images.map((image) => image.url);

            // Delete an image from server
            imageUrls.forEach((imageUrl) => {
                deleteFile(imageUrl);
            });

            // Delete an thumbnail from server
            thumbnailUrls.forEach((thumbnailUrls) => {
                deleteFile(thumbnailUrls);
            });

            // Remove articleId form user articles array
            findUser.articles.pull(id);
            await findUser.save();

            // Remove aricle from DB
            await Article.findByIdAndRemove(id);
            res.status(200).json({ message: 'Article deleted successfully' });
        }else{
            console.log('Article not found');
            return res.sendStatus(404);
        }
    }catch(err){
        console.log('Error deleting article:', err);
        return res.status(500).json({ error: 'Failed to delete article' });
    }
}

// Add new image to article
const addImageToArticle = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(id && req.files.image && req.files.image.length > 0){
            const userId = req.user.id;
            const findUser = await User.findById(userId);

            if(findUser.role !== 101 && findUser.role !== 1001){
                console.log("Unauthorized!");
                // Delete updated file
                if (req.files.image && req.files.image.length > 0) {
                  req.files.image.forEach(file => fs.unlinkSync(file.path));
                }
                return res.sendStatus(403);
            }

            const images = req.files.image.map(file => ({ url: file.path}) );
        
            const existingArticle = await Article.findById(id);
            if (!existingArticle) {
                if (req.files.image && req.files.image.length > 0) {
                    req.files.image.forEach(file => fs.unlinkSync(file.path));
                }
                console.log('Article not found');
                return res.sendStatus(404);
            }   
    
            existingArticle.images.push(...images);
            await existingArticle.save();
        
            res.status(201).json(existingArticle);
        }else{
            if (req.files.image && req.files.image.length > 0) {
                req.files.image.forEach(file => fs.unlinkSync(file.path));
            }
            console.log("Missing id or photos!");
            return res.sendStatus(400)
        }
    }catch(err){
        console.log('Error adding image to article:', err);
        return res.status(500).json({ error: 'Failed to add image to article' });
    }
}

// Delete image from an article
const deleteImageFromArticle = async (req, res) => {
    try {
        const { articleId, imageId } = req.params;
        const userId = req.user.id;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");
            return res.sendStatus(403);
        }

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
                    res.status(201).json(updatedArticle);
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
        return res.status(500).json({ error: 'Failed to remove image from article' });
    }
}

// Add new thumbnail to article
const addThumbnailToArticle = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(id && req.files.thumbnail && req.files.thumbnail.length > 0){
            const userId = req.user.id;
            const findUser = await User.findById(userId);

            if(findUser.role !== 101 && findUser.role !== 1001){
                console.log("Unauthorized!");
                // Delete updated file
                if (req.files.thumbnail && req.files.thumbnail.length > 0) {
                  req.files.thumbnail.forEach(file => fs.unlinkSync(file.path));
                }
                return res.sendStatus(403);
            }

            const thumbnail = req.files.thumbnail.map(file => ({ url: file.path}) );
        
            const existingArticle = await Article.findById(id);
            if (!existingArticle) {
                console.log('Article not found');
                if (req.files.thumbnail && req.files.thumbnail.length > 0) {
                    req.files.thumbnail.forEach(file => fs.unlinkSync(file.path));
                }
                return res.sendStatus(404);
            }   
    
            existingArticle.thumbnail.push(...thumbnail);
            await existingArticle.save();
        
            res.status(201).json(existingArticle);
        }else{
            if (req.files.thumbnail && req.files.thumbnail.length > 0) {
                req.files.thumbnail.forEach(file => fs.unlinkSync(file.path));
            }
            console.log("Missing id or photos!");
            return res.sendStatus(400)
        }
    }catch(err){
        console.log('Error adding thumbnail to article:', err);
        return res.status(500).json({ error: 'Failed to add thumbnail to article' });
    }
}

// Delete thumbnail from an article
const deleteThumbnailFromArticle = async (req, res) => {
    try {
        const { articleId, thumbnailId } = req.params;
        const userId = req.user.id;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");
            return res.sendStatus(403);
        }

        if(articleId && thumbnailId){

            // Read the article from which you want to remove an image
            const article = await Article.findById(articleId);

            // If exist delete images from an article
            if (article) {
                let isThumbnailFound = false;
                // Read array with images urls
                article.thumbnail.forEach(async (thumbnail) => {
                    if (thumbnail.id === thumbnailId) {
                        // Delete the image from the server
                        deleteFile(thumbnail.url);
                        isThumbnailFound = true;
                    }
                });
                if (isThumbnailFound) {
                    const updatedArticle = await Article.findByIdAndUpdate(
                        articleId,
                        { $pull: { thumbnail: { _id: thumbnailId } } },
                        { new: true }
                    );
                    res.status(201).json(updatedArticle);
                }else{
                    console.log('Thumbnail not found');
                    return res.sendStatus(404);
                }
            }else{
                console.log('Article not found');
                return res.sendStatus(404);
            }
        }else{
            console.log("Missing articleId or thumbnailId!");
            return res.sendStatus(400)
        }   

    }catch(err){
        console.log('Error removing thumbnail from article:', err);
        return res.status(500).json({ error: 'Failed to remove thumbnail from article' });
    }
}

// Change article to public
const changeToPublic = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");
            return res.sendStatus(403);
        }

        if(id){

            // Read the article you want to change to public
            const article = await Article.findById(id);

            // If exist change to public
            if (article) {
                article.isPublic = true;
                await article.save();
                return res.status(201).json(article);
            }else{
                console.log('Article not found');
                return res.sendStatus(404);
            }
        }else{
            console.log("Missing id!");
            return res.sendStatus(400)
        }   

    }catch(err){
        console.log('Error when changing an article to public:', err);
        return res.status(500).json({ error: 'Failed to change article to public' });
    }
}


// Change article to private
const changeToPrivate = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const findUser = await User.findById(userId);

        if(findUser.role !== 101 && findUser.role !== 1001){
            console.log("Unauthorized!");
            return res.sendStatus(403);
        }

        if(id){
            // Read the article you want to change to public
            const article = await Article.findById(id);

            // If exist change to public
            if (article) {
                article.isPublic = false;
                await article.save();
                return res.status(201).json(article);
            }else{
                console.log('Article not found');
                return res.sendStatus(404);
            }
        }else{
            console.log("Missing articleId!");
            return res.sendStatus(400)
        }   

    }catch(err){
        console.log('Error when changing an article to private:', err);
        return res.status(500).json({ error: 'Failed to change article to private' });
    }
}

module.exports = {
    addArticle: addArticle,
    editArticle: editArticle,
    getArticles: getArticles,
    getArticle: getArticle,
    deleteArtcile: deleteArtcile,
    addImageToArticle: addImageToArticle,
    deleteImageFromArticle: deleteImageFromArticle,
    addThumbnailToArticle: addThumbnailToArticle,
    deleteThumbnailFromArticle: deleteThumbnailFromArticle,
    changeToPublic: changeToPublic,
    changeToPrivate: changeToPrivate,
    getArticlesForAdmin: getArticlesForAdmin,
    getArticleForAdmin: getArticleForAdmin
}
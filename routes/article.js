const express = require('express');
const router = express.Router();
const secure = require('../middleware/verifyJWT');
const upload = multer({ dest: 'images/' });
const articleController = require('../controllers/articleController');

// Add new article
router.route('/article').post(upload.array('images'), articleController.addArticle);

// Edit an article
router.route('/article/:id').put(upload.array('images'), articleController.editArticle);

// Delete an article
router.route('/article/:id').delete(articleController.deleteArtcile);

// Get an article
router.route('/article/:id').get(articleController.getArticle);

// Get all articles
router.route('/articles').get(articleController.getArticles);

// Add images to article
router.route('article/:id/images').post(upload.array('images'), articleController.addImageToArticle);

// Delete an image (single image) from an article
router.route('/article/:articleId/images/:imageId').delete(articleController.deleteImageFromArticle);

module.exports = router;
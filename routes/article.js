const express = require('express');
const router = express.Router();
const secure = require('../middleware/authMiddleware');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const pathImages = `uploads/gallery/${year}-${month}-${day}/`;
      fs.mkdirSync(pathImages, { recursive: true });
      const pathThumbnail = `uploads/thumbnail/`;
      fs.mkdirSync(pathThumbnail, { recursive: true });
      cb(null, file.fieldname === 'thumbnail' ? pathThumbnail : pathImages);
    },
    filename: function (req, file, cb) {
      // to set a different file name
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
      // to set original file name
      // cb(null, file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    // Accepted file extensions
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.webm', '.svg'];
  
    // Check that the file extension is among the accepted extensions
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Nieprawidłowe rozszerzenie pliku.'));
    }
  };

const upload = multer({ storage: storage, fileFilter: fileFilter });
const articleController = require('../controllers/articleController');

// Add new article
router.route('/article').post(secure.authenticateUser, upload.fields([
  {
    name: 'image'
  },
  {
    name: 'thumbnail'
  }
]), articleController.addArticle);

// Edit an article
router.route('/article/:id').put(secure.authenticateUser, articleController.editArticle);

// Delete an article
router.route('/article/:id').delete(secure.authenticateUser, articleController.deleteArtcile);

// Get an article - no need JWT auth
router.route('/article/:id').get(articleController.getArticle);

// Get all articles - no need JWT auth
router.route('/articles').get(articleController.getArticles);

// Add images to article
router.route('/article/:id/images').post(secure.authenticateUser, upload.array('images'), articleController.addImageToArticle);

// Delete an image (single image) from an article
router.route('/article/:articleId/images/:imageId').delete(secure.authenticateUser, articleController.deleteImageFromArticle);

// Add thumbnail to article
router.route('/article/:id/images').post(secure.authenticateUser, upload.array('thumbnail'), articleController.addThumbnailToArticle);

// Delete an thumbnail (single thumbnail) from an thumbnail
router.route('/article/:articleId/images/:imageId').delete(secure.authenticateUser, articleController.deleteThumbnailFromArticle);

module.exports = router;
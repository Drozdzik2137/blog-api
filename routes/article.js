const express = require('express');
const router = express.Router();
const secure = require('../middleware/authMiddleware');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = 'images/';
      fs.mkdirSync(path, { recursive: true });
      cb(null, 'images/');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    }
});

const fileFilter = function (req, file, cb) {
    // Zaakceptowane rozszerzenia plików
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  
    // Sprawdź, czy rozszerzenie pliku jest wśród zaakceptowanych rozszerzeń
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
router.route('/article').post(secure.authenticateUser, upload.array('images'), articleController.addArticle);

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

module.exports = router;
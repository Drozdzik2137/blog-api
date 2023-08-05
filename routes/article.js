const express = require('express');
const router = express.Router();
const secure = require('../middleware/authMiddleware');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const articleController = require('../controllers/articleController');

// helpers to save files on the server
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

// Get all articles - no need JWT auth
router.route('/').get(articleController.getArticles);

// Get the article - no need JWT auth
router.route('/:id').get(articleController.getArticle);

// Get all artciles for admin
router.route('/admin/all').get(secure.authenticateUser, articleController.getArticlesForAdmin);

// Get the article for admin
router.route('/admin/:id').get(secure.authenticateUser, articleController.getArticleForAdmin);

// Add new article
router.route('/new').post(secure.authenticateUser, upload.fields([
  {
    name: 'image'
  },
  {
    name: 'thumbnail'
  }
]), articleController.addArticle);

// Edit an article
router.route('/:id').put(secure.authenticateUser, articleController.editArticle);

// Delete an article
router.route('/:id').delete(secure.authenticateUser, articleController.deleteArtcile);

// Add images to article
router.route('/:id/images').post(secure.authenticateUser, upload.fields([
  {
    name: 'image'
  }
]), articleController.addImageToArticle);

// Delete an image (single image) from an article
router.route('/:articleId/images/:imageId').delete(secure.authenticateUser, articleController.deleteImageFromArticle);

// Add thumbnail to article
router.route('/:id/thumbnail').post(secure.authenticateUser, upload.fields([
  {
    name: 'thumbnail'
  }
]), articleController.addThumbnailToArticle);

// Delete an thumbnail (single thumbnail) from an thumbnail
router.route('/:articleId/thumbnail/:thumbnailId').delete(secure.authenticateUser, articleController.deleteThumbnailFromArticle);

// Change to public
router.route('/:id/public').put(secure.authenticateUser, articleController.changeToPublic);

// Change to private
router.route('/:id/private').put(secure.authenticateUser, articleController.changeToPrivate);

module.exports = router;
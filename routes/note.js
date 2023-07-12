const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Read user notes
router.route('/').get(noteController.getUserNotes);

// Add new note
router.route('/new').post(noteController.createNote);

// Read single note
router.route('/:noteId').get(noteController.getNote);

// Edit user note
router.route('/:noteId').put(noteController.updateNote);

// Delete single note
router.route('/:noteId').delete(noteController.deleteNote);

module.exports = router;
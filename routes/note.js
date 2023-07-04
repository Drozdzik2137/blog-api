const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Read user notes
router.route('/notes').get(noteController.getUserNotes);

// Add new note
router.route('/note').post(noteController.createNote);

// Read single note
router.route('/note/:noteId').get(noteController.getNote);

// Edytuj notatkę użytkownika
router.route('/note/:noteId').put(noteController.updateNote);

// Delete single note
router.route('/note/:noteId').delete(noteController.deleteNote);

module.exports = router;
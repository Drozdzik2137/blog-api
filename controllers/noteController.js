const Note = require('../models/Note');
const User = require('../models/User');

// Read user notes
const getUserNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const findUser = await User.findById(userId);

    if(findUser.role !== 101 && findUser.role !== 1001){
        console.log("Unauthorized!");
        return res.sendStatus(403);
    }

    if(!userId){
        console.log('Missing user id!')
        return res.sendStatus(404);
    }
    const notes = await Note.find({ userId: userId });
    res.status(200).json(notes);
  } catch (err) {
    console.log('Error getting user notes:', err);
    res.status(500).json({ error: 'Failed to get user notes' });
  }
};

// Add new note
const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const findUser = await User.findById(userId);

    if(findUser.role !== 101 && findUser.role !== 1001){
        console.log("Unauthorized!");
        return res.sendStatus(403);
    }

    const { title, content } = req.body;
    if(!userId || !title || !content){
        console.log('Missing user id or note data!')
        return res.sendStatus(404);
    }
    const newNote = new Note({
      title: title,
      content: content,
      createdAt: new Date(),
      userId: userId
    });

    // Add note to notes array at the user in DB
    findUser.notes.push(newNote._id);

    await newNote.save();
    await findUser.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.log('Error creating note:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

// Read single note
const getNote = async (req, res) => {
  try {
    const userId = req.user.id; 
    const findUser = await User.findById(userId);

    if(findUser.role !== 101 && findUser.role !== 1001){
        console.log("Unauthorized!");
        return res.sendStatus(403);
    }

    const { noteId } = req.params;
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (err) {
    console.log('Error getting note:', err);
    res.status(500).json({ error: 'Failed to get note' });
  }
};

// Edytuj notatkę użytkownika
const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;    
    const findUser = await User.findById(userId);

    if(findUser.role !== 101 && findUser.role !== 1001){
        console.log("Unauthorized!");
        return res.sendStatus(403);
    }

    const { noteId } = req.params;
    if(!userId || !noteId){
        console.log('Missing userId and noteId!')
        return res.sendStatus(404);
    }

    const { title, content } = req.body;
    if(!title || !content){
        console.log('Missing title or content!')
        return res.sendStatus(404);
    }

    const findNote = await Note.findById(noteId);
    console.log(findNote);
    
    if(!findNote){
        console.log('Note not found');
        return res.sendStatus(404);
    }

    // Check whether the logged-in user is the owner of the note
    if((findNote.userId).toString() !== userId){
        console.log('Unauthorized access');
        return res.sendStatus(403);
    }

    const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { title, content },
        { new: true }
      );
  
      res.status(200).json(updatedNote);
  }catch(err){
    console.log('Error updating note:', err);
    res.status(500).json({ error: 'Failed to updating note' });
  }
};

// Delete single note
const deleteNote = async (req, res) => {
    try {
      const { noteId } = req.params;
      const userId = req.user.id;
      const findUser = await User.findById(userId);

      if(findUser.role !== 101 && findUser.role !== 1001){
          console.log("Unauthorized!");
          return res.sendStatus(403);
      }
  
      // Sprawdź, czy notatka istnieje
      const findNote = await Note.findById(noteId);
  
      if (!findNote) {
        console.log('Note not found');
        return res.sendStatus(404);
      }
  
      // Check whether the logged-in user is the owner of the note
      if ((findNote.userId).toString() !== userId) {
        console.log('Unauthorized access');
        return res.sendStatus(403);
      }

      // Delete note from notes array at the user in DB
      findUser.notes.pull(findNote._id);

      await findUser.save();
  
      // Delete note
      await Note.findByIdAndDelete(noteId);
  
      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
      console.log('Error deleting note:', err);
      res.status(500).json({ error: 'Failed to delete note' });
    }
  };

module.exports = {
    getUserNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote
};
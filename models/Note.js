const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            require: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }, {collection: 'note'}
);

const Note = mongoose.model('note', NoteSchema);
module.exports = Note;
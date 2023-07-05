const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            minlength: 6
        },
        refreshToken: {
            type: String
        },
        articles: [{
            type: Schema.Types.ObjectId,
            ref: 'article',
        }],
        notes: [{
            type: Schema.Types.ObjectId,
            ref: 'note',
        }],
        createdAt: {
            type: Date,
            require: true
        },
        role: {
            type: Number,
            require: true,
            default: 1
        },
        isActive: {
            type: Boolean,
            require: true,
            default: 1
        }
    }, {collection: 'user'}
);

const User = mongoose.model('user', UserSchema);
module.exports = User;
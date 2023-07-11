const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        // main photo or several photos for the carousel
        thumbnail: [
            {
                url: String
            }
        ],
        images: [
            {
                url: String,
            }
        ],
        links: [
            {
                type: String
            }
        ],
        createdAt: {
            type: Date,
            require: true
        },
        isPublic:{
            type: Boolean,
            default: false
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }, {collection: 'article'}
);

const Article = mongoose.model('article', ArticleSchema);
module.exports = Article;
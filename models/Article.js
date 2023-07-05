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
        images: [
            {
                url: String,
                isMain: Boolean

            }
        ],
        createdAt: {
            type: Date,
            require: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }, {collection: 'article'}
);

const Article = mongoose.model('article', ArticleSchema);
module.exports = Article;
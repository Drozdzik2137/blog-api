const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const secure = require('./middleware/authMiddleware');
const credentials = require('./middleware/credentials');
const db = require('./config/db');
const path = require('path')
require('dotenv').config();

const app = express();

// Connect to Mongo
db.connectionToDB();

// Needed for downloading cookies, must be before initialize cors settings
app.use(credentials);

// Public static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/articles', require('./routes/article'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));

// All routes below secure authenticateUser require jwt authentication
app.use(secure.authenticateUser);
app.use('/api/notes', require('./routes/note'));

// Listening
const port = process.env.PORT;
mongoose.connection.once('open', () => {
    console.log('Connected to the MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const secure = require('./middleware/authMiddleware');
const credentials = require('./middleware/credentials');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to Mongo
db.connectionToDB();

// Needed for downloading cookies, must be before initialize cors settings
app.use(credentials);

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', require('./routes/article'));
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/user'));

// All routes below secure authenticateUser require jwt authentication
app.use(secure.authenticateUser);
app.use('/api', require('./routes/note'));

// Listening
const port = process.env.PORT;
mongoose.connection.once('open', () => {
    console.log('Connected to the MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
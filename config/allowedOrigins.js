const allowedOrigins = `[
    '127.0.0.1:5173',
    'http://localhost:5173',
    ${process.env.ALLOWED_ORIGIN}
]`;

module.exports = allowedOrigins;
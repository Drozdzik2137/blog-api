const allowedOrigins = [
    '127.0.0.1:3000',
    'http://localhost:3000',
    `${process.env.ALLOWED_ORIGIN}`
];

module.exports = allowedOrigins;
// middleware.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (req.path === '/login' || req.path === '/signup') {
        return next();
    }

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Acceso prohibido. Token inválido.' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken,
};

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const jwt = require('jsonwebtoken');

const genrateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = genrateToken;
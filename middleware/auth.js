const jwt = require('jsonwebtoken');
const CLE_SECRETE = process.env.CLE_SECRETE;

module.exports = (req, res, next) => {
    try {
        // Récupérer le token depuis l'en-tête de la requête
        const enTeteAuth = req.headers.authorization;
        
        } catch (erreur) {
    }
};
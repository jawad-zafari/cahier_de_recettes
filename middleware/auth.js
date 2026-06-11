const jwt = require('jsonwebtoken');
const CLE_SECRETE = process.env.CLE_SECRETE;

module.exports = (req, res, next) => {
    try {
        // Récupérer le token depuis l'en-tête de la requête
        const enTeteAuth = req.headers.authorization;
        
        if (!enTeteAuth) {
            return res.status(401).json({ message: 'Accès refusé. Veuillez vous connecter.' });
        }

        } catch (erreur) {
    }
};
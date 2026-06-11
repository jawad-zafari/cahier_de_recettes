const jwt = require('jsonwebtoken');
const CLE_SECRETE = process.env.CLE_SECRETE;

module.exports = (req, res, next) => {
    try {
        // Récupérer le token depuis l'en-tête de la requête
        const enTeteAuth = req.headers.authorization;
        
        if (!enTeteAuth) {
            return res.status(401).json({ message: 'Accès refusé. Veuillez vous connecter.' });
        }

        // Séparer le mot "Bearer" du vrai token
        const token = enTeteAuth.split(' ')[1];
        
        // Vérifier si le token est valide
        const tokenDecode = jwt.verify(token, CLE_SECRETE);
        
        // Ajouter les informations de l'utilisateur à la requête
        req.utilisateur = tokenDecode;
        
        
    } catch (erreur) {
    }
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

const CLE_SECRETE = process.env.CLE_SECRETE;


// Inscription d'un nouvel utilisateur
exports.inscription = async (req, res) => {
    try {
        // Vérifier si l'utilisateur existe déjà
        const utilisateurExistant = await Utilisateur.findOne({ email: req.body.email });
        if (utilisateurExistant) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
        // Crypter le mot de passe
        const salt = await bcrypt.genSalt(10);
        const motDePasseCrypte = await bcrypt.hash(req.body.motDePasse, salt);

        // Créer le nouvel utilisateur
        const nouvelUtilisateur = new Utilisateur({
            nom: req.body.nom,
            email: req.body.email,
            motDePasse: motDePasseCrypte
        });

        } catch (erreur) {
    }
};


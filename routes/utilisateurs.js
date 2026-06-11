const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

// Clé secrète pour le token (à garder secrète dans un vrai projet)
const CLE_SECRETE = process.env.CLE_SECRETE;

// Route pour l'inscription d'un nouvel utilisateur
router.post('/inscription', async (req, res) => {
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

        // Sauvegarder dans la base de données
        await nouvelUtilisateur.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});

// Route pour la connexion
router.post('/connexion', async (req, res) => {
    try {
        // Trouver l'utilisateur par son email
        const utilisateur = await Utilisateur.findOne({ email: req.body.email });
        if (!utilisateur) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Vérifier le mot de passe
        const motDePasseValide = await bcrypt.compare(req.body.motDePasse, utilisateur.motDePasse);
        if (!motDePasseValide) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Créer le token (clé numérique)
        const token = jwt.sign({ id: utilisateur._id }, CLE_SECRETE, { expiresIn: '1h' });

        res.json({ token: token, message: 'Connexion réussie !' });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});

module.exports = router;
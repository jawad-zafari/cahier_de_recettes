const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

// Clé secrète pour le token (à garder secrète dans un vrai projet)
const CLE_SECRETE = 'ma_cle_super_secrete_123';

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


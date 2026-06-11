const express = require('express');
const router = express.Router();
const Recette = require('../models/Recette');

// Route pour ajouter une nouvelle recette
router.post('/', async (req, res) => {
    try {
        const nouvelleRecette = new Recette(req.body);
        const recetteSauvegardee = await nouvelleRecette.save();
        res.status(201).json(recetteSauvegardee);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});


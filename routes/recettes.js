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

// Route pour lire toutes les recettes
router.get('/', async (req, res) => {
    try {
        const recettes = await Recette.find();
        res.json(recettes);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});

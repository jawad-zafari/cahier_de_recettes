const express = require('express');
const router = express.Router();
const Recette = require('../models/Recette');
const auth = require('../middleware/auth');

// Route pour ajouter une nouvelle recette
router.post('/', auth, async (req, res) => {
    try {
        const nouvelleRecette = new Recette(req.body);
        const recetteSauvegardee = await nouvelleRecette.save();
        res.status(201).json(recetteSauvegardee);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

// Route pour lire toutes les recettes avec filtrage et tri
router.get('/', async (req, res) => {
    try {
        const filtre = {};

        if (req.query.auteur) {
            filtre.auteur = req.query.auteur;
        }

        if (req.query.ingredient) {
            filtre.ingredients = req.query.ingredient;
        }

        // Récupération des recettes avec filtre et tri par date (les plus récentes en premier)
        const recettes = await Recette.find(filtre).sort({ date: -1 });
        
        res.json(recettes);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});


// Route pour lire une recette spécifique par son ID
router.get('/:id', async (req, res) => {
    try {
        const recette = await Recette.findById(req.params.id);
        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }
        res.json(recette);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});

// Route pour modifier une recette
router.patch('/:id', async (req, res) => {
    try {
        const recetteMiseAJour = await Recette.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Pour renvoyer la nouvelle version
        );
        if (!recetteMiseAJour) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }
        res.json(recetteMiseAJour);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

// Route pour supprimer une recette
router.delete('/:id', async (req, res) => {
    try {
        const recetteSupprimee = await Recette.findByIdAndDelete(req.params.id);
        if (!recetteSupprimee) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }
        res.json({ message: 'Recette supprimée avec succès !' });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});


// Route pour ajouter un commentaire à une recette spécifique
router.post('/:id/commentaires', async (req, res) => {
    try {
        const recette = await Recette.findById(req.params.id);
        
        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }
        
        // Ajouter le nouveau commentaire à la liste
        recette.commentaires.push(req.body);
        
        // Sauvegarder la recette mise à jour
        const recetteMiseAJour = await recette.save();
        
        res.status(201).json(recetteMiseAJour);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

module.exports = router;
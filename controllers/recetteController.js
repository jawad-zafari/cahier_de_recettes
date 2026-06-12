const Recette = require('../models/Recette');

// Créer une nouvelle recette
exports.creerRecette = async (req, res) => {
    try {
        const nouvelleRecette = new Recette(req.body);
        const recetteSauvegardee = await nouvelleRecette.save();
        res.status(201).json(recetteSauvegardee);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
};

// Récupérer toutes les recettes avec filtrage et tri
exports.obtenirRecettes = async (req, res) => {
    try {
        const filtre = {};
        
        // Filtrer par auteur
        if (req.query.auteur) filtre.auteur = req.query.auteur;
        
        // Filtrer par ingrédient
        if (req.query.ingredient) filtre.ingredients = req.query.ingredient;

        // Trier par date (les plus récentes en premier)
        const recettes = await Recette.find(filtre).sort({ date: -1 });
        res.json(recettes);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
};

// Récupérer une recette spécifique par son ID
exports.obtenirRecetteParId = async (req, res) => {
    try {
        const recette = await Recette.findById(req.params.id);
        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }
        res.json(recette);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
};


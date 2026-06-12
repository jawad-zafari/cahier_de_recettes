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


const mongoose = require('mongoose');

// Création du schéma pour une recette
const recetteSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    etapes: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const mongoose = require('mongoose');

// Création du schéma pour un utilisateur
const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // L'email doit être unique pour chaque utilisateur
    },
    motDePasse: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

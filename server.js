const express = require('express');
const mongoose = require('mongoose');
const recettesRoutes = require('./routes/recettes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/recettes', recettesRoutes);

// URL de connexion à la base de données locale
const dbURL = 'mongodb://127.0.0.1:27017/cahier_de_recettes';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log('Connecté à la base de données MongoDB avec succès !');
    } catch (erreur) {
        console.log('Erreur de connexion :', erreur);
    }
};

connectDB();

app.get('/', (req, res) => {
    res.send('Le serveur fonctionne parfaitement !');
});

app.listen(PORT, () => {
    console.log('Serveur en écoute sur le port 3000');
});
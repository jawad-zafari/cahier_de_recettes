require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const recettesRoutes = require('./routes/recettes');
// Importation des outils pour la documentation Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const utilisateursRoutes = require('./routes/utilisateurs');

const app = express();
const PORT = 3000;

// Lecture du fichier YAML pour la documentation Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
// Mise en place de la route pour la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use('/recettes', recettesRoutes);
// Utilisation des routes utilisateurs
app.use('/utilisateurs', utilisateursRoutes);

// URL de connexion à la base de données locale
const dbURL = process.env.MONGODB_URI;

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
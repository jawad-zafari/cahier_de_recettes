const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Bonjour! Le serveur a démarré avec succès.');
});

app.listen(PORT, () => {
    console.log("Le serveur fonctionne sur le port : 3000");
});
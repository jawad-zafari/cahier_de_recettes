const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.post('/inscription', utilisateurController.inscription);
router.post('/connexion', utilisateurController.connexion);

module.exports = router;
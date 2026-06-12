const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const recetteController = require('../controllers/recetteController');

router.post('/', auth, recetteController.creerRecette);
router.get('/', recetteController.obtenirRecettes);
router.get('/:id', recetteController.obtenirRecetteParId);
router.patch('/:id', auth, recetteController.modifierRecette);
router.delete('/:id', auth, recetteController.supprimerRecette);
router.post('/:id/commentaires', recetteController.ajouterCommentaire);

module.exports = router;
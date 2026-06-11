const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

// Clé secrète pour le token (à garder secrète dans un vrai projet)
const CLE_SECRETE = 'ma_cle_super_secrete_123';


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');


const CLE_SECRETE = process.env.CLE_SECRETE;



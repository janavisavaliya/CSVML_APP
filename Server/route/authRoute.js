const express = require('express');
const routes = express.Router();
const multer = require('multer');
const upload = multer();

const { register, loginUser } = require('../controller/AuthController');

// Use upload.none() to parse FormData fields (without files)
routes.post('/register', upload.none(), register);
routes.post('/login', upload.none(), loginUser);

module.exports = routes;

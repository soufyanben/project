const express = require('express');
const router = express.Router();

const User = require('../models/User');
const UserController = require('../controllers/UserController');

//user login api
router.post('/login', UserController.user_login);

//user register api 
router.post('/register', UserController.user_register);

router.get('/auth', User_Controller.user_social_auth);
       
module.exports = router;
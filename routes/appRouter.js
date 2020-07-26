const express = require('express');
const homeController = require('../controllers/homeController');
const authentication = require('../controllers/authentication');

const router = express.Router();

// Defining The Path and it's Controller
router.route('/')
    .get(homeController.greeting);

router.route('/signup')
    .post(authentication.signUp);

module.exports = router;

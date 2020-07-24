const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

// Defining The Path and it's Controller
router.route('/')
    .get(homeController.greeting);

module.exports = router;

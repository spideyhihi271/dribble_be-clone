const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController')

// AUTH api/auth/signin
router.post('/signin', authController.signIn);

// AUTH api/auth/signUp
router.post('/signup', authController.signUp);

// AUTH api/auth/refesh
router.get('/refesh', authController.refreshToken);

// AUTH api/auth/logout
router.get('/logout', authController.logout);

module.exports = router;
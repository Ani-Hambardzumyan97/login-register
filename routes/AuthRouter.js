var express = require('express');
const { registerView, registerNewUser, loginView, loginUser } = require('../controllers/AuthController');
var router = express.Router();

/* register view */
router.get('/register', registerView);

router.post('/register', registerNewUser);

router.get('/login', loginView);

router.post('/login', loginUser);

module.exports = router;

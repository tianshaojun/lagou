var express = require('express');
var router = express.Router();

const userController = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/isSignin', userController.isSignin)

router.get('/signout', userController.signout)

module.exports = router;

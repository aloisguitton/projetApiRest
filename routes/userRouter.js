let express = require('express');
let router = express.Router();
const userCtrl = require('../controllers/userController');

router.get('/allUser', userCtrl.getAllUsers);

module.exports = router;

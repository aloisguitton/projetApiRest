let express = require('express');
let router = express.Router();
const userCtrl = require('../controllers/newsController');

router.get('/news', userCtrl.getAllUsers);

module.exports = router;

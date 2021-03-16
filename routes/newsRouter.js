let express = require('express');
let router = express.Router();
const newsCtrl = require('../controllers/newsController');

// Attention
// la clé de l'api est limité à 100 requete par jour

router.get('/test', newsCtrl.test);
router.get('/country/:country', newsCtrl.country);
router.get('/category/:category', newsCtrl.category);

module.exports = router;

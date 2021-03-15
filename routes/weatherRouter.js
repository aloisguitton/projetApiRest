let express = require('express');
let router = express.Router();
const weatherCtrl = require('../controllers/weatherController');

router.get('/getweather', weatherCtrl.getAllWeather);

module.exports = router;
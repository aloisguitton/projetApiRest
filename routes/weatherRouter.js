let express = require('express');
let router = express.Router();
const weatherCtrl = require('../controllers/weatherController');

/**
 * @swagger
 * /weather/getweather:
 */

router.get('/getweather', weatherCtrl.getAllWeather);

module.exports = router;
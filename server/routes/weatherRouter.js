let express = require('express');
let router = express.Router();
const weatherCtrl = require('../controllers/weatherController');

/**
 * @swagger
 * /weather/getweather:
 */

router.get('/getweather', weatherCtrl.getAllWeather);
router.post('/setCities', weatherCtrl.setCities);
router.delete('/removeCities', weatherCtrl.removeCity);

module.exports = router;
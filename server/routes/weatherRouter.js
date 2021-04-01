let express = require('express');
let router = express.Router();
const weatherCtrl = require('../controllers/weatherController');
const auth = require('../middleware/auth')

/**
 * @swagger
 * /weather/getweather:
 *  get:
 *   tags:
 *      - weather
 *   description: This request get all the country which the user are looking for it and return the weather of each country
 *   responses:
 *    '200':
 *      description: Returns the temperature of the cities the user wants to follow. The response formated in a json
 *    '500':
 *      description: An error occured
 *   security:
 *	   - bearerAuth: []
 */
router.get('/getweather', auth, weatherCtrl.getAllWeather);

/**
 * @swagger
 * /weather/setCities:
 *  post:
 *   tags:
 *    - weather
 *   description: This request set the cities for which the user wants the weather.
 *   responses:
 *    '200':
 *      description: Success
 *    '500':
 *      description: An error occured
 *
 *   requestBody:
 *    content:
 *     description: "user: Token id of the user.\ncities: Array of cities that the user wants to follow. It could be only on city or as many as cities that the user wants."
 *     'application/json':
 *      name: citiesArray
 *      schema:
 *       type: object
 *       properties:
 *        user:
 *         type: string
 *         example: "09867809857377678"
 *        cities:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           name:
 *            type: string
 *            example: "Bordeaux"
 *   security:
 *	   - bearerAuth: []
 */
router.post('/setCities', auth, weatherCtrl.setCities);

/**
 * @swagger
 * /weather/removeCities:
 *  delete:
 *   tags:
 *    - weather
 *   description: This request set the cities for which the user wants the weather
 *   responses:
 *    '200':
 *      description: Success
 *    '500':
 *      description: An error occured
 *
 *   requestBody:
 *    content:
 *     'application/json':
 *      name: cities
 *      schema:
 *       type: object
 *       properties:
 *        cities:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           name:
 *            type: string
 *            example: "Bordeaux"
 *   security:
 *	   - bearerAuth: []
 */
router.delete('/removeCities', auth, weatherCtrl.removeCity);

module.exports = router;
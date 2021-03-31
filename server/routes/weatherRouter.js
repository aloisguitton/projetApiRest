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
 *
 *   parameters:
 *    - in: query
 *      name: user
 *      description: Token id of the user
 *      schema:
 *       type: string
 *       example: "34578364586"
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
 *   parameters:
 *    - in: body
 *      description: "user: Token id of the user.\ncities: Array of cities that the user wants to follow. It could be only on city or as many as cities that the user wants."
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
 *   parameters:
 *    - in: body
 *      description: "user: Token id of the user.\ncities: Array of cities that the user wants to unfollow. It could be only on city or as many as cities that the user wants."
 *      name: cities
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
 */
router.delete('/removeCities', auth, weatherCtrl.removeCity);

module.exports = router;
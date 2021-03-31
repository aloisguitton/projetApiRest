let express = require('express');
let router = express.Router();
const weatherCtrl = require('../controllers/weatherController');

/**
 * @swagger
 * /weather/getweather:
 *  get:
 *   tags:
 *      - weather
 *   description: This request get all the country which the user are looking for it and return the weather of each country
 *   responses:
 *    '200':
 *      description: Returns the temperature of the cities the user wants to follow
 *    '500':
 *      description: An error occured
 *
 *   parameters:
 *    - in: query
 *      name: user
 *      description: Numeric id of the user to get his weather
 *      schema:
 *       type: integer
 *       example: 1
 */
router.get('/getweather', weatherCtrl.getAllWeather);

/**
 * @swagger
 * /weather/setCities:
 *  post:
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
router.post('/setCities', weatherCtrl.setCities);

/**
 * @swagger
 * /weather/removeCities:
 *  post:
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
router.delete('/removeCities', weatherCtrl.removeCity);

module.exports = router;
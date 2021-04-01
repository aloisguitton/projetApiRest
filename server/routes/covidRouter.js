let express = require('express');
let router = express.Router();
const auth = require('../middleware/auth')
const covidCtrl = require('../controllers/covidController');

/**
 * @swagger
 * /covid/allCountry :
 *  get:
 *   tags:
 *      - covid
 *   description: Get all country get by covid19api.com
 *   responses:
 *    '200':
 *      description: Return all country
 *
 */
router.get('/allCountry', covidCtrl.getAllCountryCovid);

/**
 * @swagger
 * /covid/covidModuleRegister :
 *  post:
 *   tags:
 *      - covid
 *   description: Register a user covid module
 *   requestBody:
 *    content:
 *     'application/json':
 *       description : Country for User covid module to register
 *       schema :
 *         required:
 *          - country
 *         properties:
 *          country:
 *           type: string
 *           example: "france"
 *   security:
 *	   - bearerAuth: []
 *   responses:
 *    '200':
 *      description: Validate that module has added
 *    '500':
 *      description: The module already exists
 *
 */
router.post('/covidModuleRegister', auth, covidCtrl.postCovid);

/**
 * @swagger
 * /covid/covidModules:
 *  get:
 *   description: Get modules of the user
 *   tags:
 *      - covid
 *   security:
 *	   - bearerAuth: []
 *   responses:
 *    '200':
 *      description: Return values to create user covid module
 *    '500':
 *      description: The module already exists
 *
 */
router.get('/covidModules', auth, covidCtrl.getCovid);

/**
 * @swagger
 * /covid/covidModulesDelete:
 *  delete:
 *   description: Remove a user covid module
 *   tags:
 *      - covid
 *   requestBody:
 *    content:
 *     'application/json':
 *       description : Country for User covid module to register
 *       schema :
 *        required:
 *         - country
 *        properties:
 *         country:
 *          type: string
 *          example: "france"
 *   security:
 *	   - bearerAuth: []
 *   responses:
 *    '200':
 *      description: Validate module has removed
 *
 */
router.delete('/covidModulesDelete', auth, covidCtrl.delCovid);

module.exports = router;
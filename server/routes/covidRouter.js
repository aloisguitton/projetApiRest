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
 * /covidModuleRegister :
 *  post:
 *   tags:
 *      - covid
 *   description: Register a user covid module
 *
 *   parameters:
 *     - in: headers
 *       name: User Token
 *       description: User token for authentication
 *       schema:
 *         required:
 *          - usertoken
 *         properties:
 *           usertoken:
 *             type: string
 *
 *     - in: body
 *       name : Country
 *       description : Country for User covid module to register
 *       schema :
 *         required:
 *          - country
 *         properties:
 *          country:
 *           type: string
 *           example: "france"
 *
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
 * /covidModules:
 *  get:
 *   description: Get modules of the user
 *   tags:
 *      - covid
 *
 *   parameters:
 *     - in: headers
 *       name: User Token
 *       description: User token for authentication
 *       schema:
 *         required:
 *          - usertoken
 *         properties:
 *           usertoken:
 *             type: string
 *
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
 * /covidModulesDelete:
 *  delete:
 *   description: Remove a user covid module
 *   tags:
 *      - covid
 *
 *   parameters:
 *     - in: headers
 *       name: User Token
 *       description: User token for authentication
 *       schema:
 *         required:
 *          - usertoken
 *         properties:
 *           usertoken:
 *             type: string
 *
 *     - in: body
 *       description : User module to delete
 *       required:
 *        - country
 *       properties:
 *        country:
 *         type: string
 *         example: "france"
 *
 *   responses:
 *    '200':
 *      description: Validate module has removed
 *
 */
router.delete('/covidModulesDelete', auth, covidCtrl.delCovid);

module.exports = router;
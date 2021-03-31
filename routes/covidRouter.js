let express = require('express');
let router = express.Router();
const auth = require('../middleware/auth')
const covidCtrl = require('../controllers/covidController');

/**
 * @swagger
 * /covid/allCountry :
 *  get:
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
 *   description: Register a user covid module
 *   parameters :
 *     - in: body
 *       description : User module to register
 *       required:
 *        - usertoken
 *        - country
 *       properties:
 *        usertoken:
 *         type: string
 *        country:
 *         type: string
 *         example: "south-africa"
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
 * /covidModules/:usertoken :
 *  get:
 *   description: Get modules of the user
 *   parameters :
 *     - in: query
 *       description : User token
 *       name : userToken
 *       required:
 *        - usertoken
 *       properties:
 *        usertoken:
 *         type: string
 *   responses:
 *    '200':
 *      description: Return values to create user covid module
 *    '500':
 *      description: The module already exists
 *
 */
router.get('/covidModules/:usertoken', auth, covidCtrl.getCovid);

/**
 * @swagger
 * /covidModules/:usertoken/:country :
 *  delete:
 *   description: Remove a user covid module
 *   parameters :
 *     - in: query
 *       description : User module to delete
 *       required:
 *        - usertoken
 *        - country
 *       properties:
 *        usertoken:
 *         type: string
 *        country:
 *         type: string
 *         example: "south-africa"
 *   responses:
 *    '200':
 *      description: Validate module has removed
 *
 */
router.delete('/covidModules/:usertoken/:country', auth, covidCtrl.delCovid);

module.exports = router;
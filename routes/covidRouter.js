let express = require('express');
let router = express.Router();
const auth = require('../middleware/auth')
const covidCtrl = require('../controllers/covidController');

/**
 * @swagger
 * /allCountry :
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
 *   responses:
 *    '200':
 *      description: Validate that module has added
 *    '500':
 *      description: The module already exists
 *
 */
//router.post('/covidModuleRegister', auth, covidCtrl.postCovid);
router.post('/covidModuleRegister', covidCtrl.postCovid);

/**
 * @swagger
 * /covidModules :
 *  get:
 *   description: Get modules of the user
 *   parameters:
 *     - in:
 *       name: userToken
 *       schema:
 *         type: string
 *   responses:
 *    '200':
 *      description: Return all modules of the user
 *    '500':
 *      description: The module already exists
 *
 */
//router.get('/covidModules/:userId', auth, covidCtrl.getCovid);
router.get('/covidModules', covidCtrl.getCovid);

/**
 * @swagger
 * /covidModules :
 *  delete:
 *   description: Remove a user covid module
 *   responses:
 *    '200':
 *      description: Validate module has removed
 *
 */
//router.del('/covidModules/:userId/:country', auth, covidCtrl.delCovid);
router.delete('/covidModuleRemove/:country', covidCtrl.delCovid);

module.exports = router;
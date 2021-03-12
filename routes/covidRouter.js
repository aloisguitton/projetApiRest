let express = require('express');
let router = express.Router();
const covidCtrl = require('../controllers/covidController');

/**
 * @swagger
 * /:country :
 *  get:
 *   description: Get all country get by covid19api.com
 *   responses:
 *    '200':
 *      description: Return all country
 *
 */
router.get('/:country', covidCtrl.getAllCountryCovid);

module.exports = router;
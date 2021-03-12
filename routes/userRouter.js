let express = require('express');
let router = express.Router();

const userCtrl = require('../controllers/userController');

/**
 * @swagger
 * /user/register:
 *  post:
 *   description: Get all users
 *   responses:
 *    '200':
 *      description: Return all api users
 *
 *   parameters:
 *    - in: body
 *      name: user
 *      schema:
 *       type: object
 *       required:
 *        - firstname
 *        - lastname
 *        - password
 *        - email
 *        - address
 *        - city
 *        - zip
 *       properties:
 *        firstname:
 *         type: string
 *        lastname:
 *         type: string
 *        password:
 *         type: string
 *         default: "1a1dc91c907325c69271ddf0c944bc72"
 *        email:
 *         type: string
 *        address:
 *         type: string
 *        city:
 *         type: string
 *        zip:
 *         type: string
 */

router.post('/register', userCtrl.register)

module.exports = router;

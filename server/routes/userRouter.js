let express = require('express');
let router = express.Router();

const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth')

/**
 * @swagger
 * /user/register:
 *  post:
 *   tags:
 *    - user
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
 *         example: "1a1dc91c907325c69271ddf0c944bc72"
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

/**
 * @swagger
 * /user/connect:
 *  post:
 *   tags:
 *    - user
 *   description: Get all users
 *   responses:
 *    '200':
 *      description: Connection route
 *    '500':
 *      description: An error occured
 *    '401':
 *      description: Incorrect email or password
 *
 *   parameters:
 *    - in: body
 *      name: id
 *      schema:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *        email:
 *         type: string
 *         example: "test@gmail.fr"
 *        password:
 *         type: string
 *         example: "1a1dc91c907325c69271ddf0c944bc72"
 */
router.post('/connect', userCtrl.connect)

/**
 * @swagger
 * /user/parameters:
 *  get:
 *   tags:
 *    - user
 *   description: Get all users
 *   responses:
 *    '200':
 *      description: Informations
 *    '500':
 *      description: An error occured
 *    '401':
 *      description: Unauthorized
 *
 *   parameters:
 *    - in: query
 *      name: token
 *      type: string
 *      description: "token from connect route"
 *    - in: query
 *      name: userId
 *      type: string
 *      description: "userId from connect route"
 */
router.get('/parameters', auth, userCtrl.parameters)

module.exports = router;

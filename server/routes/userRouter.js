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
 *   requestBody:
 *    content:
 *     'application/json':
 *        schema:
 *         type: object
 *         required:
 *          - firstname
 *          - lastname
 *          - password
 *          - email
 *          - address
 *          - city
 *          - zip
 *         properties:
 *          firstname:
 *           type: string
 *          lastname:
 *           type: string
 *          password:
 *           type: string
 *           example: "1a1dc91c907325c69271ddf0c944bc72"
 *          email:
 *           type: string
 *           example: "test@gmail.fr"
 *          address:
 *           type: string
 *          city:
 *           type: string
 *          zip:
 *           type: string
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
 *   requestBody:
 *    content:
 *     'application/json':
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
 *   description: Get parameters
 *   responses:
 *    '200':
 *      description: Informations
 *    '500':
 *      description: An error occured
 *    '401':
 *      description: Unauthorized
 *   security:
 *	   - bearerAuth: []
 */
router.get('/parameters', auth, userCtrl.parameters)

module.exports = router;

let express = require('express');
let router = express.Router();
const userCtrl = require('../controllers/userController');

/**
 * @swagger
 * /user/allUser:
 *  get:
 *   description: Get all users
 *   responses:
 *    '200':
 *      description: Return all api users
 *   parameters:
 *    - in: query
 *      name: userId
 *      schema:
 *       type: integer
 *      required: false
 *      description: The user's id
 *
 */
router.get('/allUser', userCtrl.getAllUsers);

module.exports = router;

let express = require('express');
let router = express.Router();
const newsCtrl = require('../controllers/newsController');
const auth = require('../middleware/auth')

// Attention
// la clé de l'api est limité à 100 requete par jour

/**
 * @swagger
 * /news/bddapi :
 *  get:
 *   tags:
 *      - news
 *   description: Get request API one user
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
router.get('/bddapi', auth, newsCtrl.requestBddApi);
/**
 * @swagger
 * /news/requetsoneuser/ :
 *  get:
 *   tags:
 *      - news
 *   description: Get  BDD one user
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
router.get('/requetsoneuser', auth, newsCtrl.requetsOneUser);
/**
 * @swagger
 * /news/register:
 *  post:
 *   tags:
 *      - news
 *   description: |
 *      code of the country you want to get headlines for. Possible options :
 *      ae, ar, at ,au ,be ,bg ,br ,ca ,ch ,cn ,co ,cu ,cz ,de ,eg ,fr ,gb ,gr ,hk ,hu ,id ,ie ,il ,in ,it ,jp ,kr ,lt ,lv ,ma ,mx ,my ,ng ,nl ,no ,nz ,ph ,pl ,pt ,ro ,rs ,ru ,sa ,se ,sg ,si ,sk ,th ,tr ,tw ,ua ,us ,ve ,za
 *      The category you want to get headlines for. Possible options:
 *      business, entertainment, general, health, science, sports, technology
 *   responses:
 *    '200':
 *      description: true
 *    '500':
 *      description: false
 *   requestBody:
 *    content:
 *     'application/json':
 *      schema:
 *       type: object
 *       required:
 *        - country
 *        - category
 *       properties:
 *        news:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           country:
 *            type: string
 *            example: fr
 *           category:
 *            type: string
 *            example: technology
 *   security:
 *	   - bearerAuth: []
 */
router.post('/register', auth, newsCtrl.register);

module.exports = router;

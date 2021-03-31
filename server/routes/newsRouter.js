let express = require('express');
let router = express.Router();
const newsCtrl = require('../controllers/newsController');

// Attention
// la clé de l'api est limité à 100 requete par jour

/**
 * @swagger
 * /news/bddapi/ :
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
 *
 *   parameters:
 *    - in: query
 *      name: user
 *      type: integer
 *      required: true
 *      description: "id user"
 */
router.get('/bddapi/', newsCtrl.requestBddApi);
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
 *
 *   parameters:
 *    - in: query
 *      name: user
 *      type: integer
 *      description: "id user"
 */
router.get('/requetsoneuser/', newsCtrl.requetsOneUser);
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
 *   parameters:
 *    - in: body
 *      name: category and country
 *      schema:
 *       type: object
 *       required:
 *        - id_user
 *        - country
 *        - category
 *       properties:
 *        idUser:
 *         type: integer
 *        country:
 *         type: string
 *         example: fr
 *        category:
 *         type: string
 *         example: technology
 */
router.post('/register', newsCtrl.register);

module.exports = router;

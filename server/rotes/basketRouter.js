const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require("../middleware/checkRoleMiddleware");


router.post('/createBasket',checkRole('USER'), basketController.putInBasket )
router.post('/delBasket', checkRole('USER'), basketController.delOneFromBasket )
router.post('/delSingleBasket', checkRole('USER'), basketController.delSingleFromBasket )
router.post('/clearBasket', checkRole('USER'), basketController.delAllFromBasket )
router.get('/getBasket',checkRole('USER'), basketController.getBasket )
router.get('/', basketController.getBasketId )





module.exports = router
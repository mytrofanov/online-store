const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')


router.post('/createBasket', basketController.putInBasket )
router.post('/delBasket',  basketController.deleteFromBasket )
router.get('/getBasket', basketController.getBasket )





module.exports = router
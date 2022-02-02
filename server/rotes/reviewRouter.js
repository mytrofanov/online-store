const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('USER'), reviewController.create )
router.post('/review/del', checkRole('USER'), reviewController.delete )
router.get('/review/get', reviewController.getAll )
router.get('/getOneDev', reviewController.getAllForOneDevice )



module.exports = router
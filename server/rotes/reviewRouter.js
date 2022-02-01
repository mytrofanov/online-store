const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/review', checkRole('USER'), reviewController.create )
router.post('/review/del', checkRole('USER'), reviewController.delete )
router.get('/review/get', reviewController.getAll )



module.exports = router
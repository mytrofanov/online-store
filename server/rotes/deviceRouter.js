const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), deviceController.create )
router.post('/update', checkRole('ADMIN'), deviceController.update )
router.post('/updateInfo', checkRole('ADMIN'), deviceController.updateInfo )
router.post('/createInfo', checkRole('ADMIN'), deviceController.createInfo )
router.post('/delInfo', checkRole('ADMIN'), deviceController.deleteInfo)
router.post('/del', checkRole('ADMIN'), deviceController.delete )
router.get('/', deviceController.getAll )
router.get('/:id', deviceController.getOne )


module.exports = router
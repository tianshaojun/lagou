const express = require('express')

const positionController = require('../controllers/position')

const fileUploadMiddleWare = require('../middlewares/fileupload')
const userAuthMiddleware = require('../middlewares/userauth')

const router = express.Router()

// list 负责返回某一个页数据，同时会把total(positions集合文档的总数)返回
router.get('/list', userAuthMiddleware.auth, positionController.list)
// listall 返回 total(positions集合文档的总数)，为了提高性能，没有返回职位数据
router.get('/listall', positionController.listall)

router.post('/save', fileUploadMiddleWare.fileupload, positionController.save)
router.delete('/remove', positionController.remove)
router.post('/update', fileUploadMiddleWare.fileupload, positionController.update)
router.post('/listone', positionController.listone)

module.exports = router
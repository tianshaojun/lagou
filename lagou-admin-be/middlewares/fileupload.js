const multer = require('multer')
const path = require('path')
const positionModel = require('../models/position')

var filename = ''
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/'))
  },
  filename: function (req, file, cb) {
    let originalName = file.originalname
    let ext = originalName.substr(originalName.lastIndexOf('.'))
    filename = file.fieldname + '-' + Date.now() + ext
    // 将文件名绑定在req.body对象上，目的是在下一个中间件中能够获取到此文件名，并入库
    req.body.companyLogo = filename
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {

  // 这个函数应该调用 `cb` 用boolean值来
  // 指示是否应接受该文件

  // 文件类型满足条件
  // let type = ['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)
  if (/^image/.test(file.mimetype)) {
    // 接受这个文件，使用`true`，像这样:
    cb(null, true)
  } else {
    // 拒绝这个文件，使用`false`，像这样:
    cb(null, false)
    // 如果有问题，你可以总是这样发送一个错误:
    cb(new Error('文件类型必须是.jpg, .jpeg, .png, .gif'))
  }
}

const upload = multer({
  storage,
  fileFilter
}).single('companyLogo')

const fileupload = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      res.render('position', {
        ret: false,
        data: JSON.stringify({
          msg: err.message
        })
      })
    } else {
      if (!!filename) {
        next()
      } else {
        // 告诉下一个中间件：
        // 编辑状态，且用户没有选择图片
        // req.body.companyLogo = req.body.companyLogoName
        // delete(req.body.companyLogoName)

        // 方案三
        // req.body.companyLogo = req.body.companyLogo

        // 方案四
        let result = await positionModel.listone(req.body.id)
        req.body.companyLogo = result.companyLogo

        next()
      }
      // 全局变量，需要置空
      filename = ''
    }
  })
}

module.exports = {
  fileupload
}
const auth = (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')

  // 此处username, 每个连接都会创建一个
  let username = req.session.username
  if (!!username) {
    // res.render('position', {
    //   ret: true,
    //   data: JSON.stringify({
    //     username
    //   })
    // })
    next()
  } else {
    res.render('position', {
      ret: false,
      data: JSON.stringify({
        msg: '没有访问权限，请登录~'
      })
    })
  }
}

module.exports = {
  auth
}
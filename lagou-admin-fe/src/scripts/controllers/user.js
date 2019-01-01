const userTpl = require('../views/user.html')
const userBtnTpl = require('../views/user.btn.html')

import userModel from '../models/user'

let signupClicked = true
let isSignin = false

// 给登录注册按钮绑定事件
const _bindUserInfoEvents = () => {
  // 编程思想：
  // 以数据来驱动页面的更新，不再进行DOM操作
  $('.userinfo-btn').on('click', 'span', function () {
    let type = $(this).attr('type')
    if (type === 'signin') {
      signupClicked = false
    }
    
    // 注册逻辑
    if (type === 'signup') {
      signupClicked = true
    }
    
    $('#userbtn').html(template.render(userBtnTpl, {
      signupClicked
    }))

    $('#userform').get(0).reset()

    // 注册和登录按钮绑定
    $('#sign').on('click', async function () {
      let url = signupClicked ? '/api/user/signup' : '/api/user/signin'
      let data = $('#userform').serialize()
      let result = await userModel.sign({
        url,
        data
      })

      // 用户登录或注册成功处理
      if (signupClicked) {
        alert(result.data.msg)
      } else {
        // 当用户点击了登录按钮
        if (result.ret) {
          isSignin = true
          $('#user').html(template.render(userTpl, {
            isSignin,
            username: result.data.username
          }))

          _bindSignoutEvent()
        } else {
          alert(result.data.msg)
        }
      }
    })
  })

  // 登出按钮绑定
  _bindSignoutEvent()
}

const _bindSignoutEvent = () => {
  // 登出按钮绑定
  $('#signoutbtn').off('click').on('click', async () => {
    let result = await userModel.signout()
    if (result.ret) {
      location.reload()
    }
  })
}

const render = async () => {
  // 获取用户登录状态
  let result = await userModel.isSignin()
  if (result.ret) {
    isSignin = true
  }

  // 渲染：判断用户是否登录
  // todo
  // 开始渲染

  $('#user').html(template.render(userTpl, {
    isSignin,
    username: result.data.username
  }))

  $('#userbtn').html(template.render(userBtnTpl, {
    signupClicked
  }))
  

  // 如果用户没有登录，再去绑定显示用户登录信息的窗口，为了减少不必要的事件绑定
  // if (!isSignin) {
    _bindUserInfoEvents()
  // }
}

export default {
  render
}
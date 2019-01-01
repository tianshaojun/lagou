import router from './router'

import bodyTpl from './views/body.html'

import userTpl from './views/user.html'

import userController from './controllers/user'

import '../styles/app.scss'

// 装填Wrapper
$('#root').html(bodyTpl)

// 装载user
$('#user').html(userTpl)
// 绑定显示用户信息的事件
userController.render()

// 载入路由
router.render()

// 绑定导航
router.navLink()
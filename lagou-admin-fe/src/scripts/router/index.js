import SMERouter from 'sme-router'

// 装载模板
import homeTpl from '../views/home.html'

// 装载controller
import positionController from '../controllers/position'

// 路由定义
var router = null
const _render = () => {
  router = new SMERouter('router-view')

  // 首页
  router.route('/home', (req, res, next) => {
    res.render(homeTpl)
  })

  // 职位管理 - 列表
  router.route('/position', (req, res, next) => {
    positionController.list({
      router,
      req,
      res,
      next
    })
  })

  // 职位管理 - 添加
  router.route('/position_save', (req, res, next) => {
    positionController.save({
      router,
      req,
      res,
      next
    })
  })

  // 职位管理 - 修改
  router.route('/position_update', (req, res, next) => {
    positionController.update({
      router,
      req,
      res,
      next
    })
  })

  // 通用路由
  router.route('*', (req, res, next) => {
    // 当路由不匹配时
    res.redirect('/home')
  })

  // 第一次渲染页面时，需要将路由导航到 /home
  // router.go('/home')

  // 定义中间件，路由切换时调用
  // 用来实现导航高亮
  router.use((req) => {
    _activeLink(req.route)
  })
}

// 路由导航
const _navLink = () => {
  let $lis = $('#sidebar-menu li[to]')
  $lis.on('click', function () {
    let to = $(this).attr('to')
    router.go(to)
  })
}

// 导航高亮
const _activeLink = (route) => {
  let $lis = $('#sidebar-menu li[to]')
  $lis
    .filter(`[to="${route}"]`)
    .addClass('active')
    .siblings()
    .removeClass('active')
}

export default {
  render: _render,
  navLink: _navLink
}
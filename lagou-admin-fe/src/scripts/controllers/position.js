import positionListTpl from '../views/position.list.html'
import positionSaveTpl from '../views/position.save.html'
import positionUpdateTpl from '../views/position.update.html'
import positionModel from '../models/position'

const _genToken = () => {
  return new Date().getTime() + Math.random()
}

const _bindListEvents = ({
  router,
  req,
  pageSize
}) => {
  // 给添加按钮绑定
  $('#addbtn').on('click', () => {
    router.go('/position_save')
  })

  // 给删除按钮绑定事件
  $('.pos-remove').on('click', function () {
    let that = this
    _removePosition({
      that,
      router,
      req,
      pageSize
    })
  })

  // 给修改按钮绑定事件
  $('.pos-update').on('click', function () {
    let id = $(this).attr('posid')
    router.go('/position_update', {
      id
    })
  })

  // 给搜索按钮绑定事件
  $('#possearch').on('click', function () {
    let keywords = $('#keywords').val()
    let query = {
      ...req.query,
      pageNo: 1,
      keywords,
      _: _genToken()
    }
    router.go(`/position?${$.param(query)}`)
  })
  // input事件，输入内容就触发
  // change 事件，失去焦点触发
  // $('#keywords').on('input', function () {
  //   clearTimeout($(this).timer)
  //   $(this).timer = setTimeout(() => {
  //     let keywords = $(this).val()
  //     console.log(keywords)
  //   }, 2000)
  // })
}

const _removePosition = async ({
  that,
  router,
  req,
  pageSize
}) => {
  let id = $(that).attr('posid')
  let result = await positionModel.remove(id)
  if (result.ret) {
    let {keywords = '', pageNo} = req.query || {pageNo: 1}
    //1、去后端取最鲜活的total, 根据total 计算最鲜活的 pageCount
    let total = (await positionModel.listall({keywords})).data.total
    //2、计算鲜活的pageCount
    let pageCount = Math.ceil(total / ~~pageSize)
    //3、判断pageCount 和 pageNo关系
    // 如果 pageNo > pageCount, 表明是在最后一页，且已经删光了
    if (pageNo > pageCount && pageNo != 1) {
      pageNo = pageNo - 1
    }
    // 给路由加个ID来实现新的路由的跳转
    router.go(`/position?_=${id}&pageNo=${pageNo}&keywords=${keywords || ''}`)
  } else {
    alert('删除失败:(')
  }
}

const _bindSaveEvents = (router) => {
  // 给返回按钮绑定事件
  $('#posback').on('click', () => {
    router.back()
  })

  // 给提交按钮绑定事件
  $('#possubmit').on('click', async () => {
    // let data = $('#possave').serialize()
    // let result = await positionModel.save(data)
    // if (result.ret) {
    //   $('#possave').get(0).reset()
    // } else {
    //   alert(result.data.msg)
    // }
    let result = await positionModel.save()

    if (result.ret) {
      $('#possave').get(0).reset()
    } else {
      alert(result.data.msg)
    }
  })
}

const _bindUpdateEvents = (router) => {
  // 给返回按钮绑定事件
  $('#posback').on('click', () => {
    router.back()
  })

  // 给提交按钮绑定事件
  $('#possubmit').on('click', async () => {
    let result = await positionModel.update()
    if (result.ret) {
      router.back()
    } else {
      alert(result.data.msg)
    }
  })
}

const list = async ({
  router,
  res,
  req
}) => {
  let result = (await positionModel.list({
    pageNo,
    pageSize,
    keywords
  }))
  
  // 用户是否登录
  if (!result.ret) {
    router.go('/home')
    return
  } else {
    var { list, total } = result.data
  }

  let {
    pageNo = 1, pageSize = 10, keywords = ''
  } = req.query || {}


  let pageCount = Math.ceil(total / ~~pageSize)
  let html = template.render(positionListTpl, {
    list, // 列表数据源
    pageArray: new Array(pageCount), // 构造分页页码数组
    pageNo: ~~pageNo, // 当前页
    pageCount: ~~pageCount, // 总页数
    pageSize: ~~pageSize, // 每页条数
    keywords //关键字
  })


  res.render(html)

  // 添加，修改，删除 按钮的事件绑定
  _bindListEvents({
    router,
    req,
    pageSize
  })
}

const save = ({
  router,
  req,
  res,
  next
}) => {
  res.render(positionSaveTpl)

  _bindSaveEvents(router)
}

// 渲染修改页面
const update = async ({
  router,
  req,
  res,
  next
}) => {
  let id = req.body.id

  let html = template.render(positionUpdateTpl, {
    data: (await positionModel.listone(id)).data
  })

  res.render(html)

  _bindUpdateEvents(router)
}

export default {
  list,
  save,
  update
}
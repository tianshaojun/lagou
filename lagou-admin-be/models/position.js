const mongoose = require('../utils/database')

// 创建Schema，创建集合
const positionSchema = new mongoose.Schema({
  companyLogo: String,
  companyName: String,
  positionName: String,
  city: String,
  salary: String,
  createDate: String
})
const PositionModel = mongoose.model('positions', positionSchema)

// 保存一条职位信息
const save = (data) => {
  return new PositionModel(data)
    .save()
    .then((result) => {
      return result
    })
}

// 取到单页职位信息
const list = ({
  start,
  count,
  keywords
}) => {
  let reg = new RegExp(keywords, 'gi')
  return PositionModel
    // 关键字模糊查询
    .find({
      $or: [
        {
          'companyName': reg
        },
        {
          'positionName': reg
        }
      ]
    })
    .sort({
      _id: -1
    })
    .skip(start)
    .limit(count)
    .then((result) => {
      return result
    })
    // catch表示find操作出错了，空数据并不代表出错
    .catch((err) => {
      return false
    })
}
// 取到全部职位信息
const listall = ({keywords}) => {
  let reg = new RegExp(keywords, 'gi')
  return PositionModel
    .find({
      $or: [{
          'companyName': reg
        },
        {
          'positionName': reg
        }
      ]
    })
    .sort({
      _id: -1
    })
    // .count()
    .then((result) => {
      return result
    })
    // catch表示find操作出错了，空数据并不代表出错
    .catch((err) => {
      return false
    })
}

// 显示单条信息
const listone = (id) => {
  return PositionModel
    .findById(id)
    .then((result) => {
      return result
    })
}

// 删除职位信息
const remove = (id) => {
  return PositionModel
    .findByIdAndDelete(id)
    .then((result) => {
      return result
    })
}

// 修改职位信息
const update = async ({
  id,
  data
}) => {
  // 方案一
  // if (!!data.companyLogo) {
  //   return PositionModel
  //     .findByIdAndUpdate(id, data)
  //     .then((result) => {
  //       return result
  //     })
  // } else {
  //   let {
  //     companyName,
  //     positionName,
  //     salary,
  //     city
  //   } = data
  //   return PositionModel
  //     .findByIdAndUpdate(id, {
  //       companyName,
  //       positionName,
  //       salary,
  //       city
  //     })
  //     .then((result) => {
  //       return result
  //     })
  // }

  // 方案二
  // return PositionModel
  //   .findByIdAndUpdate(id, data)
  //   .then((result) => {
  //     return result
  //   })

  // 方案三
  // return PositionModel
  //   .findByIdAndUpdate(id, data)
  //   .then((result) => {
  //     return result
  //   })

  // 方案四
  return PositionModel
    .findByIdAndUpdate(id, data)
    .then((result) => {
      return result
    })
}

module.exports = {
  list,
  listall,
  listone,
  save,
  remove,
  update
}
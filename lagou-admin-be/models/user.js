const mongoose = require('../utils/database')

// 创建Schema，创建集合
const userSchema = new mongoose.Schema({
  username: String,
  password: String
})
const UserModel = mongoose.model('users', userSchema)

// 注册
const signup = (data) => {
  let userModel = new UserModel(data)
  return userModel
    .save()
    .then((result) => {
      return result
    })
}

// 查找用户
const findone = (condition) => {
  return UserModel.findOne(condition)
    .then((result) => {
      return result
    })
}

module.exports = {
  signup,
  findone
}
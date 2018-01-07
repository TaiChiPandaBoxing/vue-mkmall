const User = require('./../models/user')
require('./../util')
// 登录
exports.login = function (req, res) {
  const params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(params, (error, userDoc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message
      })
      return
    }
    if (userDoc) {
      res.cookie('userId', userDoc.userId, {
        path: '/', // 保存到项目的根目录，即域名，而不是某一个路由
        maxAge: 1000 * 60 * 60
      })
      res.cookie('userName', userDoc.userName, {
        path: '/', // 保存到项目的根目录，即域名，而不是某一个路由
        maxAge: 1000 * 60 * 60
      })
      // req.session.user = userDoc
      res.json({
        status: '1',
        msg: '',
        result: {
          userName: userDoc.userName
        }
      })
      return
    }
    res.json({
      status: '0',
      msg: '用户或密码错误',
      result: ''
    })
  })
}

// 登出
exports.logout = function (req, res) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '1',
    msg: '',
    result: ''
  })
}

// 检查是否登录
exports.checkLogin = function (req, res) {
  if (req.cookies.userId) {
    res.json({
      status: '1',
      msg: '',
      result: req.cookies.userName || ''
    })
    return
  }
  res.json({
    status: '0',
    msg: '未登录',
    result: ''
  })
}

// 获取用户的购物车的数量
exports.getCartCount = function (req, res) {
  if (req.cookies && req.cookies.userId) {
    const userId = req.cookies.userId
    User.findOne({ userId }, (error, userDoc) => {
      if (error) {
        res.json({
          status: '0',
          msg: error.message,
          result: ''
        })
        return
      }
      if (userDoc) {
        let cartCount = 0
        const cartList = userDoc.cartList
        cartList.forEach((item) => {
          cartCount += parseInt(item.productNum)
        })
        res.json({
          status: '1',
          msg: '',
          result: cartCount
        })
      }
    })
  }
}

// 获取用户的购物车列表
exports.cartList = function (req, res) {
  const userId = req.cookies.userId
  User.findOne({ userId }, (error, userDoc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    if (userDoc) {
      res.json({
        status: '1',
        msg: '',
        result: userDoc.cartList
      })
    }
  })
}

// 删除购物车中的商品
exports.delCart = function (req, res) {
  const userId = req.cookies.userId
  const productId = req.body.productId
  User.update({ userId }, { $pull: { cartList: { productId } } }, (error, doc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    if (doc) {
      res.json({
        status: '1',
        msg: '',
        result: 'success'
      })
    }
  })
}

// 编辑购物车信息
exports.editCart = function (req, res) {
  const userId = req.cookies.userId
  const productId = req.body.productId
  const productNum = req.body.productNum
  const checked = req.body.checked
  User.update({ userId, 'cartList.productId': productId }, { 'cartList.$.productNum': productNum, 'cartList.$.checked': checked }, (error, doc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    if (doc) {
      res.json({
        status: '1',
        msg: '',
        result: 'success'
      })
    }
  })
}

// 购物车全选功能
exports.checkAll = function (req, res) {
  const userId = req.cookies.userId
  const checkAll = req.body.checkAll
  User.findOne({ userId }, (error, userDoc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    if (userDoc) {
      userDoc.cartList.forEach((item) => {
        item.checked = checkAll
      })
      userDoc.save((error1, doc) => {
        if (error1) {
          res.json({
            status: '0',
            msg: error1.message,
            result: ''
          })
          return
        }
        res.json({
          status: '1',
          msg: '',
          result: doc
        })
      })
    }
  })
}

// 查询用户地址
exports.addressList = function (req, res) {
  const userId = req.cookies.userId
  User.findOne({ userId }, (error, userDoc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    res.json({
      status: '1',
      msg: '',
      result: userDoc.addressList
    })
  })
}
// 设置用户的默认地址
exports.setDefault = function (req, res) {
  const userId = req.cookies.userId
  const addressId = req.body.addressId
  if (!addressId) {
    res.json({
      status: '0',
      msg: 'addressId is null',
      result: ''
    })
    return
  }
  User.findOne({ userId }, (error, userDoc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    const addressList = userDoc.addressList
    addressList.forEach((item) => {
      if (item.addressId === addressId) {
        item.isDefault = true
      } else {
        item.isDefault = false
      }
    })
    userDoc.save((error1, doc) => {
      if (error1) {
        res.json({
          status: '0',
          msg: error1.message,
          result: ''
        })
        return
      }
      res.json({
        status: '1',
        msg: '',
        result: doc.addressList
      })
    })
  })
}
// 删除用户的地址
exports.delAddress = function (req, res) {
  const userId = req.cookies.userId
  const addressId = req.body.addressId
  User.update({ userId }, { $pull: { addressList: { addressId } } }, (error, doc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    if (doc) {
      res.json({
        status: '1',
        msg: '',
        result: 'success'
      })
    }
  })
}
// 支付方法
exports.payMent = function (req, res) {
  const userId = req.cookies.userId
  const addressId = req.body.addressId
  const orderTotal = req.body.orderTotal
  User.findOne({ userId }, (error, userDoc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    // 获取用户的地址信息
    let address = ''
    const goodsList = []
    userDoc.addressList.forEach((item) => {
      if (addressId === item.addressId) {
        address = item
      }
    })
    // 获取用户购物车的购买商品
    userDoc.cartList.forEach((item) => {
      if (item.checked === true) {
        goodsList.push(item)
      }
    })
    const platform = '622'
    const randomOne = Math.floor(Math.random() * 10)
    const randomTwo = Math.floor(Math.random() * 10)
    const systemDate = new Date().Format('yyyyMMddhhmmss')
    const orderCreateDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
    const orderId = platform + randomOne + systemDate + randomTwo
    const order = {
      orderId,
      orderTotal,
      addressInfo: address,
      goodsList,
      orderStatus: '1',
      createDate: orderCreateDate
    }
    userDoc.orderList.push(order)
    userDoc.save((error1) => {
      if (error1) {
        res.json({
          status: '0',
          msg: error1.message,
          result: ''
        })
        return
      }
      res.json({
        status: '1',
        msg: '',
        result: {
          orderId: order.orderId,
          orderTotal: order.orderTotal
        }
      })
    })
  })
}
// 根据订单Id查询订单信息
exports.orderDetail = function (req, res) {
  const userId = req.cookies.userId
  const orderId = req.param('orderId')
  User.findOne({ userId }, (error, userDoc) => {
    if (error) {
      res.json({
        status: '0',
        msg: error.message,
        result: ''
      })
      return
    }
    const orderList = userDoc.orderList
    if (orderList.length < 0) {
      res.json({
        status: '0',
        msg: '无此订单',
        result: ''
      })
      return
    }
    let orderTotal = 0
    orderList.forEach((item) => {
      if (item.orderId === orderId) {
        orderTotal = item.orderTotal
      }
    })
    if (orderTotal <= 0) {
      res.json({
        status: '0',
        msg: '当前用户未创建订单',
        result: ''
      })
      return
    }
    res.json({
      status: '1',
      msg: '',
      result: {
        orderId,
        orderTotal
      }
    })
  })
}

const Goods = require('./../models/goods')
const User = require('./../models/user')
// 商品列表页
exports.list = function (req, res) {
  let params = {}
  // 当前第几页
  const page = parseInt(req.param('page'))
  // 每页多少条数据
  const pageSize = parseInt(req.param('pageSize'))
  // 排序 升序 1 / 降序 -1
  const sort = req.param('sort')
  // 分页
  const skip = (page - 1) * pageSize
  const priceLevel = req.param('priceLevel')
  let priceGt = ''
  let priceLte = ''
  if (priceLevel !== 'all') {
    switch (parseInt(priceLevel)) {
      case 0: priceGt = 0; priceLte = 100; break;
      case 1: priceGt = 100; priceLte = 500; break;
      case 2: priceGt = 500; priceLte = 1000; break;
      default: priceGt = 1000; priceLte = 5000; break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  } else {
    params = {}
  }
  const goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  if (sort) {
    goodsModel.sort({ salePrice: sort })
  }
  goodsModel.exec((err, goodsDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: goodsDoc.length,
          list: goodsDoc
        }
      })
    }
  })
}

exports.addCart = function (req, res) {
  const userId = req.cookies.userId
  const productId = req.body.productId
  User.findOne({ userId }, (err, userDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
      return
    }
    if (userDoc) {
      let goodsItem = ''
      userDoc.cartList.forEach((item) => {
        if (item.productId === productId) {
          goodsItem = item
          item.productNum++
        }
      })
      if (goodsItem) {
        userDoc.save((error2, newGoodsDoc) => {
          if (error2) {
            res.json({
              status: '0',
              msg: '保存出错'
            })
            return
          }
          res.json({
            status: '1',
            msg: '保存成功',
            result: newGoodsDoc
          })
        })
        return
      }
      Goods.findOne({ productId }, (error1, goodsDoc) => {
        if (error1) {
          res.json({
            status: '0',
            msg: error1.message
          })
          return
        }
        if (goodsDoc) {
          // goodsDoc.productNum = 1
          // goodsDoc.checked = true
          const goods = {
            productId: goodsDoc.productId,
            productName: goodsDoc.productName,
            salePrice: goodsDoc.salePrice,
            productImage: goodsDoc.productImage,
            productNum: 1,
            checked: true
          };
          userDoc.cartList.push(goods)
          userDoc.save((error2, newGoodsDoc) => {
            if (error2) {
              res.json({
                status: '0',
                msg: error2.message
              })
              return
            }
            res.json({
              status: '1',
              msg: '保存成功',
              result: newGoodsDoc
            })
          })
        } else {
          res.json({
            status: '0',
            msg: '系统出错'
          })
        }
      })
    } else {
      res.json({
        status: '0',
        msg: '用户不存在'
      })
    }
  })
}

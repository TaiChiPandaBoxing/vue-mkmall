const express = require('express')
// const mongoose = require('mongoose')

const router = express.Router()
// const Goods = require('./../models/goods')
const Goods = require('./../controllers/goods')

// mongoose.connect('mongodb://127.0.0.1:27017/dumall')
// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected success.')
// })
// mongoose.connection.on('error', () => {
//   console.log('MongoDB connected fail.')
// })
// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB connected disconnected.')
// })
/* eslint-disable no-unused-vars */
// router.get('/', (req, res, next) => {
//   let params = {}
//   // 当前第几页
//   const page = parseInt(req.param('page'))
//   // 每页多少条数据
//   const pageSize = parseInt(req.param('pageSize'))
//   // 排序 升序 1 / 降序 -1
//   const sort = req.param('sort')
//   // 分页
//   const skip = (page - 1) * pageSize
//   const priceLevel = req.param('priceLevel')
//   let priceGt = ''
//   let priceLte = ''
//   if (priceLevel !== 'all') {
//     switch (parseInt(priceLevel)) {
//       case 0: priceGt = 0; priceLte = 100; break;
//       case 1: priceGt = 100; priceLte = 500; break;
//       case 2: priceGt = 500; priceLte = 1000; break;
//       default: priceGt = 1000; priceLte = 5000; break;
//     }
//     params = {
//       salePrice: {
//         $gt: priceGt,
//         $lte: priceLte
//       }
//     }
//   } else {
//     params = {}
//   }
//   const goodsModel = Goods.find(params).skip(skip).limit(pageSize)
//   if (sort) {
//     goodsModel.sort({ salePrice: sort })
//   }
//   goodsModel.exec((err, doc) => {
//     if (err) {
//       res.json({
//         status: '1',
//         msg: err.message
//       })
//     } else {
//       res.json({
//         status: '0',
//         msg: '',
//         result: {
//           count: doc.length,
//           list: doc
//         }
//       })
//     }
//   })
// })

// 商品列表页
router.get('/list', Goods.list)
// 加入购物车
router.post('/addCart', Goods.addCart)
module.exports = router

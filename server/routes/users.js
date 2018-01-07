const express = require('express');
const User = require('./../controllers/user')

const router = express.Router();
/* eslint-disable no-unused-vars */
/* GET users listing. */
// 用户登录的接口
router.post('/login', User.login);
router.post('/logout', User.logout);
router.get('/checkLogin', User.checkLogin);
// 用户购物车的接口
router.get('/getCartCount', User.getCartCount);
router.get('/cartList', User.cartList);
router.post('/cartDel', User.delCart);
router.post('/cartEdit', User.editCart);
router.post('/editCheckAll', User.checkAll);
// 用户地址的接口
router.get('/addressList', User.addressList)
router.post('/setDefault', User.setDefault)
router.post('/delAddress', User.delAddress)
// 用户订单支付
router.post('/payMent', User.payMent)
router.get('/orderDetail', User.orderDetail)
module.exports = router;

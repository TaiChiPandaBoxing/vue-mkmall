const mongoose = require('mongoose')

const userScheam = new mongoose.Schema({
  userId: String,
  userName: String,
  userPwd: String,
  orderList: Array,
  cartList: [
    {
      productId: String,
      productName: String,
      productImage: String,
      salePrice: String,
      checked: Boolean,
      productNum: Number
    }
  ],
  addressList: [
    {
      addressId: String,
      userName: String,
      streetName: String,
      postCode: Number,
      tel: String,
      isDefault: Boolean
    }
  ]
})

module.exports = mongoose.model('User', userScheam, 'users')

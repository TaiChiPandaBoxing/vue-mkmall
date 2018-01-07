import Vue from 'vue';
import Router from 'vue-router';

const GoodsList = (resolve) => {
  import('@/views/Goods/GoodsList/GoodsList').then((module) => {
    resolve(module)
  })
}
const Cart = (resolve) => {
  import('@/views/Cart/Cart').then((module) => {
    resolve(module)
  })
}
const Address = (resolve) => {
  import('@/views/Address/Address').then((module) => {
    resolve(module)
  })
}
const OrderConfirm = (resolve) => {
  import('@/views/OrderConfirm/OrderConfirm').then((module) => {
    resolve(module)
  })
}
const OrderSuccess = (resolve) => {
  import('@/views/OrderSuccess/OrderSuccess').then((module) => {
    resolve(module)
  })
}
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm,
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess,
    },
  ],
});

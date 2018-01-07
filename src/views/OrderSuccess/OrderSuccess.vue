<template>
  <div class="order-list-wrapper">
     <nav-bread>
      <span>Order Success</span>
    </nav-bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2">
          <span>check out</span>
        </h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur">
            <span>Confirm</span> address</li>
          <li class="cur">
            <span>View your</span> order</li>
          <li class="cur">
            <span>Make</span> payment</li>
          <li class="cur">
            <span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="./../../assets/img/ok-2.png" alt="">
        </div>
        <div class="order-create-main">
          <h3>Congratulations!
            <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{ orderId }}</span>
            <span>Order total：{{ orderTotal }}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <!-- <a href="javascript:;" class="btn btn-m">Cart List</a> -->
              <router-link class="btn btn-m" to="/cart">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">
              <!-- <a href="javascript:;" class="btn btn-m">Goods List</a> -->
              <router-link class="btn btn-m" to="/">Goods List</router-link>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavBread from '@/components/NavBread/NavBread'

export default {
  name: 'OrderSuccess',
  components: {
    NavBread
  },
  data() {
    return {
      orderId: '',
      orderTotal: 0
    };
  },
  created() {
    const orderId = this.$route.query.orderId
    if (!orderId) {
      return
    }
    this.$http.get('/api/users/orderDetail', {
      params: {
        orderId
      }
    }).then((response) => {
      const res = response.data
      if (res.status === '1') {
        this.orderId = orderId
        this.orderTotal = res.result.orderTotal
      }
    })
  }
}
</script>

<style lang="css" scoped>

</style>
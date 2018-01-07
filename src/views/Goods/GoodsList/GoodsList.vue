<template>
  <div class="accessory-result-page accessory-page">
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <symbol id="icon-arrow-short" viewBox="0 0 25 32">
        <title>arrow-short</title>
        <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
    </symbol>
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">Sort by:</span>
        <a href="javascript:void(0)" class="default" :class="{'cur': sortActive}" @click="sortGoods('default')">Default</a>
        <a href="javascript:void(0)" class="price" :class="{'cur': !sortActive}" @click="sortGoods('price')">Price
          <svg class="icon icon-arrow-short" :class="{'sort-up': sortFlag == 1}">
            <use xlink:href="#icon-arrow-short"></use>
          </svg>
        </a>
        <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
      </div>
      <div class="accessory-result">
        <!-- filter -->
        <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
          <dl class="filter-price">
            <dt>Price:</dt> 
            <dd @click="setPriceFilter('all')"><a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}">All</a></dd>
            <dd v-for="(price, index) in priceFilter" :key="index" @click="setPriceFilter(index)">
              <a href="javascript:void(0)" :class="{'cur': priceChecked === index}">{{ price.startPrice }} - {{ price.endPrice }}</a>
            </dd>
          </dl>
        </div>

        <!-- search result accessories list -->
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li v-for="(item, index) in goodsList" :key="index">
                <div class="pic">
                  <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
                </div>
                <div class="main">
                  <div class="name">{{ item.productName }}</div>
                  <div class="price">{{ item.salePrice }}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="load-more">
              <img v-show="loading" :src="require('./../../../assets/loading-svg/loading-spinning-bubbles.svg')" alt="load">
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :md-show="mdShow" @close="mdShow = false">
      <p slot="message">
        请先登录，否则无法加入到购物车中！
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn-m" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal :md-show="mdShowCart" @close="mdShowCart = false">
      <p slot="message">
        <symbol id="icon-status-ok" viewBox="0 0 32 32">
          <title>status-ok</title>
          <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
          <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
        </symbol>
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功！</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn-m" @click="mdShowCart = false">继续购物</a>
        <router-link href="javascript:;" class="btn btn-m" to="/cart" @click.native="mdShowCart = false">查看购物车</router-link>
      </div>
    </modal>
  </div>
</template>

<script>
import NavBread from '@/components/NavBread/NavBread'
import Modal from '@/components/Modal/Modal'

export default {
  name: 'GoodsList',
  components: {
    NavBread,
    Modal
  },
  data() {
    return {
      goodsList: [],
      sortFlag: '',
      page: 1,
      pageSize: 8,
      busy: true,
      loading: false,
      sortActive: true,
      mdShow: false,
      mdShowCart: false,
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
    };
  },
  created() {
    this.getGoodsList()
    this.hideFilterPop()
  },
  methods: {
    getGoodsList(flag) {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        // sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      if (this.sortFlag) {
        params.sort = this.sortFlag
      } else {
        params.sort = ''
      }
      this.loading = true
      this.$http.get('/api/goods/list', { params }).then((res) => {
        if (res.data.status === '0') {
          this.loading = false
          if (flag) {
            this.goodsList = this.goodsList.concat(res.data.result.list)
            if (res.data.result.count < this.pageSize) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goodsList = res.data.result.list
            this.busy = false
          }
        } else {
          this.loading = false
          this.goodsList = []
        }
      })
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.filterBy = false
      this.$bus.$emit('toggle-overLay', false)
      this.page = 1
      this.getGoodsList()
    },
    showFilterPop() {
      this.filterBy = true
      this.$bus.$emit('toggle-overLay', true)
    },
    hideFilterPop() {
      this.$bus.$on('hide-filterPop', () => {
        this.filterBy = false
      })
    },
    sortGoods(type) {
      if (type === 'default') {
        this.sortActive = true
        this.sortFlag = ''
        this.page = 1
        this.getGoodsList()
      } else {
        this.sortActive = false
        if (this.sortFlag === -1 || !this.sortFlag) {
          this.sortFlag = 1
        } else {
          this.sortFlag = -1
        }
        this.page = 1
        this.getGoodsList()
      }
    },
    loadMore() {
      this.busy = true
      setTimeout(() => {
        this.page++
        // 传参表示数据需要累加
        this.getGoodsList(true)
      }, 500);
    },
    addCart(id) {
      this.$http.post('/api/goods/addCart', { productId: id }).then((res) => {
        if (res.data.status === '1') {
          this.mdShowCart = true
          this.$store.commit('UPDATE_CART_COUNT', 1)
        } else {
          this.mdShow = true
        }
      })
    },
  },
  beforeDestroy() {
    this.$bus.$off('hide-filterPop')
  }
};
</script>

<style lang="css" scoped>
@import "~./../../../../assets/css/product.css";
.load-more{
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.sort-up{
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  transition: all .3s ease-out;
}
</style>
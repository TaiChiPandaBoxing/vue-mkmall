<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="./../../assets/img/logo.png">
        </a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link" v-text="nickName" v-if="nickName"></span>
          <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="loginModalFlag = true">Login</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="nickName" @click="logout">Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': loginModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Login in</div>
          <button class="md-close" @click="loginModalFlag = false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi-form-input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi-login-input regi-login-input-left" placeholder="User Name"
                  data-type="loginname">
              </li>
              <li class="regi-form-input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi-login-input regi-login-input-left login-input-no input-text"
                  placeholder="Password" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登 录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag = false"></div>
  </header>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      userName: '',
      userPwd: '',
      errorTip: false,
      loginModalFlag: false,
      // nickName: ''
    };
  },
  computed: {
    // nickName() {
    //   return this.$store.state.nickName
    // },
    // cartCount() {
    //   return this.$store.state.cartCount
    // }
    ...mapState(['nickName', 'cartCount'])
  },
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      this.$http.get('/api/users/checkLogin').then((response) => {
        const res = response.data
        if (res.status === '1') {
          // this.nickName = res.result
          this.loginModalFlag = false
          this.$store.commit('UPDATE_USER_INFO', res.result)
          this.getCartCount()
        }
        if (this.$route.path !== '/') {
          this.$router.push('/')
        }
      })
    },
    getCartCount() {
      this.$http.get('/api/users/getCartCount').then((response) => {
        const res = response.data
        if (res.status === '1') {
          // this.nickName = res.result
          this.$store.commit('INIT_CART_COUNT', res.result)
        }
      })
    },
    login() {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true
        return
      }
      this.$http.post('/api/users/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then((response) => {
        const res = response.data
        if (res.status === '1') {
          this.loginModalFlag = false
          this.errorTip = false
          this.$store.commit('UPDATE_USER_INFO', res.result.userName)
          this.getCartCount()
          // this.nickName = res.result.userName
          return
        }
        this.errorTip = true
      })
    },
    logout() {
      this.$http.post('/api/users/logout').then((response) => {
        const res = response.data
        if (res.status === '1') {
          // this.nickName = ''
          this.$router.push('/')
          this.$store.commit('UPDATE_USER_INFO', '')
          this.$store.commit('INIT_CART_COUNT', 0)
        }
      })
    }
  }
};
</script>

<style lang="css" scoped>
.header {
  position: relative;
  width: 100%;
  background-color: white;
  font-family: "moderat", sans-serif;
  font-size: 16px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 70px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 20px 10px 20px;
}

.navbar-left-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: -20px;
}

.header a{
  color: #666;
  text-decoration: none;
}

a {
  -webkit-transition: color .3s ease-out;
  transition: color .3s ease-out;
}

.navbar-right-container {
  display: none;
  justify-content: flex-start;
  align-items: center;
}

.navbar-menu-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}

.navbar-link {
  padding-left: 15px;
}

.navbar-cart-container {
  position: relative;
}

.navbar-cart-count {
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -9px;
  right: -11px;
  width: 20px;
  border-radius: 10px;
  color: white;
  background-color: #eb767d;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.navbar-cart-logo {
  width: 25px;
  height: 25px;
  transform: scaleX(-1);
}
.regi-form-input{
  position: relative;
  height: 42px;
  line-height: 42px;
  background: none;
  margin-bottom: 15px;
  font-size: 14px;
  overflow: hidden;
  border:1px solid #ccc;
  padding-bottom: 0;
}
.regi-form-input .icon {
  /* display: inline-block; */
  float: left;
  width: 25px;
  height: 29px;
  margin: 6px 0 0 14px;
  background-position: 4px 5px;
  background-image: url('./../../assets/img/icon.png');
  background-repeat: no-repeat;
}
.regi-form-input .IconPwd {
  background-position: -198px 3px;
}
.regi-form-input .regi-login-input{
  position: absolute;
  left:45px;
  top:0;
  padding: 9px 0 10px;
  width: 270px;
  font-size: 14px;
  zoom: 1;
  border: none;
  color: #333;
  /*height: 23px;*/
  line-height: 23px;
  background: 0 0!important;
}
.md-title{
  position: absolute;
  top: 14px;
  line-height: 24px;
  padding: 8px 0;
  color: #333;
  font-size: 18px;
  font-weight: 400;
  font-style: normal;
}
.login-wrap{
  margin-top:30px;
}
.md-content .btn-login{
  display: block;
  height: 38px;
  line-height: 38px;
  border: 2px solid #009de6;
  background: #009de6;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.btn-login:hover {
  background: #61b1ef;
  border: 2px solid #61b1ef;
}
.error-wrap .error{
  font-size: 12px;
  color: #d31723;
  visibility: hidden;
  display: block;
  padding: 0 0 7px 17px;
  line-height: 16px;
  height: 16px;
  text-align: left;
  background: url("./../../assets/img/icon.png") 0 -100px no-repeat;
}
.md-content .error-wrap .error-show{
  visibility: visible;
  height: auto;
}
</style>
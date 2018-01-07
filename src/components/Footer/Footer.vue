<template>
  <footer class="footer">
    <div class="footer-wrap">
      <div class="footer-secondary">
        <div class="footer-inner">
          <div class="footer-region">
            <span>Region</span>
            <select class="footer-region-select">
              <option value="en-US">USA</option>
              <option value="zh-CN">China</option>
              <option value="in">India</option>
            </select>
          </div>
          <div class="footer-secondary-nav">
            <span>Copyright © 2017 IMooc All Rights Reserved.</span>
            <a href="http://us.lemall.com/us/aboutUs.html">
              About Us
            </a>
            <a href="http://us.lemall.com/us/termsofUse.html">
              Terms &amp; Conditions
            </a>
            <a href="http://us.lemall.com/us/privacyPolicy.html">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {};
    }
  };

</script>

<style lang="css" scoped>
.footer {
  background-color: #f5f7fc;
  color: #333;
  position: relative;
}

.footer a {
  color: #666;
  text-decoration: none;
}

.footer-wrap {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-primary .footer-inner {
  height: 104px;
}

.footer-secondary {
  border-top: 1px solid rgba(51, 51, 51, 0.15);
}

.footer-secondary .footer-inner {
  height: 100px;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
}

.footer-region {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 36px;
}

.footer-region span {
  color: #ada9a5;
}

.footer-secondary-nav {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 36px;
}

.footer-secondary-nav a,
.footer-secondary-nav span {
  color: #ada9a5;
  margin-left: 3.3125em;
}

.footer-secondary-nav a:first-child,
.footer-secondary-nav span:first-child {
  margin-left: 0;
}

.footer-region-flag {
  display: inline-block;
  position: relative;
  top: 7px;
  width: 38px;
}

@media screen and (max-width: 1440px) {
  .footer-nav a {
    margin-left: 2em;
  }

  .footer-secondary-nav a,
  .footer-secondary-nav span {
    margin-left: 1.5em;
  }
}

@media screen and (max-width: 991px) {
  .footer-nav a {
    font-size: 12px;
  }

  .footer-secondary-nav a,
  .footer-secondary-nav span {
    font-size: 12px;
  }
}

@media screen and (max-width: 767px) {
  .footer-primary .footer-inner {
    padding-top: 80px;
    padding-bottom: 80px;
    height: auto;
    text-align: center;
  }

  .footer-secondary .footer-inner {
    padding: 15px 0 20px;
    height: auto;
    text-align: center;
  }

  .footer-logo {
    position: static;
    top: 0;
    left: 0;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    height: 42.73px;
    width: 164px;
    display: inline-block;
  }

  .footer-nav {
    position: static;
    top: 0;
    left: 0;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    display: block;
    margin-top: 70px;
  }

  .footer-nav a {
    margin-top: 23px;
    margin-left: 0;
    display: block;
  }

  .footer-nav a:first-of-type {
    margin-top: 0;
  }

  .footer-region {
    position: static;
    top: 0;
    left: 0;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }

  .footer-secondary-nav {
    position: static;
    top: 0;
    left: 0;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    margin-top: 50px;
  }

  .footer-secondary-nav span,
  .footer-secondary-nav a {
    display: block;
    margin-left: 0;
  }

  .footer-secondary-nav a {
    margin-top: 1.6363636364em;
  }
}
</style>

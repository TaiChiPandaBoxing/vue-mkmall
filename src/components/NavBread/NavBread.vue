<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot></slot>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBread',
  data() {
    return {};
  }
}

</script>

<style lang="css" scoped>
.nav-breadcrumb-wrap {
  background: #f0f0f0;
}

.nav-breadcrumb {
  padding: 10px 0;
  line-height: 25px;
  font-size: 14px;
}

.nav-breadcrumb a {
  position: relative;
  margin-right: 16px;
  color: #999;
}

.nav-breadcrumb a:after {
  position: absolute;
  top: 3px;
  right: -12px;
  content: "/";
  line-height: 1.2;
}

.nav-breadcrumb a:hover {
  color: #d1434a;
}

.nav-breadcrumb span {
  color: #d1434a;
}
</style>
<template>
  <div class="modal-wrapper">
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="mdHide">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name='message'></slot>
          </div>
          <div class="btn-wrap">
            <slot name='btnGroup'></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="mdHide"></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    mdShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    mdHide() {
      this.$emit('close')
    }
  }
}
</script>
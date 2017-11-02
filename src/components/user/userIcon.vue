<template>
  <div class="user-icon" @mouseover = 'userShow' @mouseout="userShow">
    <img src="../../assets/usericon.png" alt="用户信息">
    <ul :class="{isShow:isShow}">
      <li>基本信息</li>
      <li>修改密码</li>
      <li>退出登录</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      userShow () {
        this.isShow = !this.isShow
      }
    }
  }
</script>


<style lang="scss" scoped>
.user-icon {
  position: absolute;
  width: 0.26rem;
  height: 0.26rem;
  top: 0.14rem;
  right: 0.5rem;
  display: block;
  cursor: pointer;
}
img {
  width: 100%;
  height: 100%;
  display: block;
  top: 0;
  left: 0;
}
ul {
  width: 1.1rem;
  height: 1.21rem;
  padding: 0.15rem 0;
  position: relative;
  left: -0.84rem;
  top: 0;
  border: 1px solid #4d6b81;
  background: #202b33;
  box-sizing: border-box;
  display: none;
  z-index: 9999;
  &.isShow{
    display: block;
  }
  li {
    font-size: 0.14rem;
    line-height: 0.3rem;
    color: #22d8f0;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:hover {
      color: #b3f6ff;
      background: #4d6b81;
    }
  }
}
</style>

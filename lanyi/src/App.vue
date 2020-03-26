<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view/>
  </div>
</template>

<style lang="less">
  body{
    background: #f5f5f5;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix::after{
    content: "";
    display: block;
    clear: both;
  }
  .auto-img{
    width: 100%;
    display: block
  }
  .one-text{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  p{
    margin: 0;
  }
</style>

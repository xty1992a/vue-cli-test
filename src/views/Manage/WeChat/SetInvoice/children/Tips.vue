<template functional>
  <div class="tips">
    <i :class="props.icon || 'el-icon-warning'"></i>
    <span>{{props.message}}</span>
  </div>
</template>

<style lang="less" rel="stylesheet/less">

  .tips {
    display: inline;
    color: #999;
    padding-left: 10px;

    i {
      margin: 0 5px;
    }
  }
</style>

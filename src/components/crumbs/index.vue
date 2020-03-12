<template>
  <header class="crumbs">
    <div class="text-wrap" :class="borderBottom?'border':''">
      <h3>
        <span v-for="(item ,index) in texts"
              @click="goToCrumb(item)">{{texts.length == (index + 1) ? item.text : `${item.text}>>` }}</span>
      </h3>
      <div class="right">
        <slot></slot>
      </div>
    </div>
    <transition name="fade">
      <div class="page-tips" :class="tipSuccess?'success':'fail'" v-if="show && tipText">
        <span>{{tipText}}</span>
        <i class="iconfont icon-closed" @click="show=false"></i>
      </div>
    </transition>
  </header>
</template>

<script>
  const string2obj = (s) => s.split('&').reduce((p, i) => (p[i.split('=')[0]] = i.split('=')[1], p), {});
  export default {
	name: 'crumbs',
	props: {
	  texts: {
		type: Array,
		default: []
	  },
	  tip: {
		type: Boolean,
		default: true
	  },
	  borderBottom: {  // ��
		type: Boolean,
		default: true
	  }
	},
	data() {
	  return {
		tipSuccess: false,
		tipText: '',
		show: false
	  };
	},
	created() {
	  this.show = this.tip;
	  this.getTips();
	},
	methods: {
	  getTips() {
		if (!this.tip) return;
		let query = string2obj(location.search.substring(1));
		this.tipSuccess = query.Success === 'True';
		this.tipText = decodeURIComponent(query.Message || '');
	  },
	  goToCrumb(item) {
		if (item && item.url) {
		  return window.location.href = item.url;
		}
	  }
	},
	computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .crumbs {
    .text-wrap {
      background-color: #fff;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;

      &.border {
        border-bottom: 1px solid #ccc;
      }

      h3 {
        line-height: 40px;
        color: @activeC;
        font-size: 17px;
        padding-left: 28px;
        font-weight: 400;

        span {
          cursor: pointer;
        }
      }
    }

    .page-tips {
      height: 36px;
      line-height: 36px;
      display: flex;
      justify-content: space-between;
      padding: 0 14px;

      .iconfont {
        cursor: pointer;
      }

      &.success {
        color: #468847;
        background-color: #dff0d8;
      }

      &.fail {
        color: #b94a48;
        background-color: #f2dede;
      }
    }

    .fade-enter, .fade-leave-to {
      height: 0;
      opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
      transition: .3s;
    }
  }
</style>

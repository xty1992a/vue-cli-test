/**
 * Created by TY-xie on 2018/3/28.
 */
import Vue from 'vue';
import App from './index.vue';
import Element from 'element-ui';
import 'utils/config.vue.js';
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Element);

console.log('get in ');
new Vue({
  el: '#app',
  render: h => h(App),
  components: {App}
});

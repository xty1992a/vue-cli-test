/**
 * Created by TY-xie on 2018/4/2.
 */
import Vue from 'vue';

Vue.prototype.pub = new Vue();
Vue.mixin({
  data() {
	return {
	  initialData: null,
	};
  },
  created() {
	let vData = document.getElementById('v_data');
	if (vData) {
	  if (vData.value) {
		this.initialData = JSON.parse(vData.value || '{}');
	  }
	}
  },
  methods: {
	getPath(path) {
	  path = path || '';
	  let fileServerDomain = this.initialData.FileServerDomain || '';
	  if (!fileServerDomain) {
		let vdata = document.getElementById('fileServerDomain');
		fileServerDomain = vdata && (vdata.value || '');
	  }
	  return (path.startsWith('http') || path.startsWith('Images')) ? path : fileServerDomain + path;
	},
  },
});
export default Vue;

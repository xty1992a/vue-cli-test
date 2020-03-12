<template>
  <div class="set-invoice">
    <crumbs :texts="crumbsTexts"></crumbs>
    <section class="edit-content">
      <el-form label-width="140px" :model="formData" :rules="rules" ref="form">
        <!-- 商户信息-->
        <fieldset>
          <legend>商户信息</legend>
          <el-form-item label="s_pappid" prop="sPappid" required>
            <el-input class="normal-input" v-model="formData.sPappid" placeholder="请输入6位s_pappid"/>
          </el-form-item>
          <el-form-item label="商户识别码" prop="merchantNumber" required>
            <el-input class="normal-input" v-model="formData.merchantNumber" placeholder="请输入6位商户识别码" maxlength="6"/>
            <tips message="限长6位"/>
          </el-form-item>
        </fieldset>
        <!-- 纳税人信息-->
        <fieldset>
          <legend>纳税人信息</legend>
          <el-form-item label="纳税人识别码" required prop="taxpayerIdentificationCode">
            <el-input class="normal-input" v-model="formData.taxpayerIdentificationCode" placeholder="请输入纳税人识别码"/>
          </el-form-item>
          <el-form-item label="纳税人名称" required prop="taxpayerName">
            <el-input class="normal-input" v-model="formData.taxpayerName" placeholder="请输入纳税人名称"/>
          </el-form-item>
          <el-form-item label="纳税人电话" required prop="taxpayerTel">
            <el-input class="normal-input" v-model="formData.taxpayerTel" placeholder="请输入纳税人电话"/>
            <tips message="支持座机、手机"/>
          </el-form-item>
          <el-form-item label="纳税人地区" required prop="taxpayerAddress">
            <el-cascader
                    placeholder="请选择纳税人地区"
                    v-model="formData.taxpayerAddress"
                    :options="addressOptions"/>
          </el-form-item>
          <el-form-item label="纳税人详细地址" required prop="taxpayerFullAddress">
            <el-input class="normal-input" v-model="formData.taxpayerFullAddress" placeholder="请输入纳税人详细地址"/>
          </el-form-item>
          <el-form-item label="银行账号" required prop="taxpayerBankAccount">
            <el-input class="normal-input" v-model="formData.taxpayerBankAccount" placeholder="请输入纳税人银行账号"/>
          </el-form-item>
          <el-form-item label="开户地区" required prop="taxpayerBankAddress">
            <el-cascader
                    v-model="formData.taxpayerBankAddress"
                    :options="addressOptions"
                    @change="bankAdsChange"/>
          </el-form-item>
          <el-form-item label="开户银行" required prop="taxpayerBankCode">
            <el-cascader
                    v-if="taxpayerBankBlinkFlag"
                    v-model="formData.taxpayerBankCode"
                    @active-item-change="handleItemChange"
                    :placeholder="formData.taxpayerBankAddress.length?'请选择开户银行':'请先选择上方开户地址'"
                    :disabled="!formData.taxpayerBankAddress.length"
                    :options="bankList"/>
          </el-form-item>
        </fieldset>
        <!--开票信息-->
        <fieldset>
          <legend>开票信息</legend>
          <el-form-item label="开票人" required prop="drawer">
            <el-input class="normal-input" v-model="formData.drawer" placeholder="请输入开票人"/>
          </el-form-item>
          <el-form-item label="收款人" required prop="payee">
            <el-input class="normal-input" v-model="formData.payee" placeholder="请输入收款人"/>
          </el-form-item>
          <el-form-item label="复核人" required prop="reviewer">
            <el-input class="normal-input" v-model="formData.reviewer" placeholder="请输入复核人"/>
          </el-form-item>
          <el-form-item label="税收分类编码" required prop="revenueClassifyCode">
            <el-input class="normal-input" v-model="formData.revenueClassifyCode" placeholder="请输入税收分类编码" maxlength="19"/>
            <tips message="限长19位"/>
          </el-form-item>
          <el-form-item label="税率" required prop="taxRate">
            <el-input class="normal-input" v-model="formData.taxRate" placeholder="请输入税率"/>
          </el-form-item>
          <el-form-item label="商品或服务名称" required prop="codingName">
            <el-input class="normal-input" v-model="formData.codingName" placeholder="请输入商品或服务名称"/>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="formData.isUsed"/>
          </el-form-item>
        </fieldset>

      </el-form>
      <div class="foot">
        <el-button type="primary" @click="onSaveAll">保存所有</el-button>
      </div>
    </section>
  </div>
</template>

<script>
  import Crumbs from 'components/crumbs';
  import Tips from './children/Tips';
  import ExpTest from 'utils/expTest';
  import {login, getBankBrach, saveInvoice, getAllMap} from 'api/manage';

  // 转换地址数据格式
  function fmtAddress(list) {
	function walk(list, deep) {
	  deep++;
	  return list.map(item => {
		const result = {value: item.code, label: item.name};
		if (deep === 3) {
		  return result;
		}
		return {...result, children: walk(item.childMap, deep)};
	  });
	}

	return walk(list, 0);
  }

  export default {
	name: 'set-invoice',
	components: {Crumbs, Tips},
	data() {
	  const telTest = (rule, value, callback) => {
		if (!value) return callback(new Error('请输入电话！'));
		if (!ExpTest.allTel.test(value)) return callback(new Error('请输入正确的电话！'));
		callback();
	  };
	  const taxRateTest = (rule, value, callback) => {
		if (!value || value === '0') return callback(new Error('税率不能为空或0！'));
		if (!ExpTest.money.test(value)) return callback(new Error('税率不正确！'));
		callback();
	  };
	  return {
		formData: {
		  "sPappid": "",
		  "merchantNumber": "",

		  "taxpayerIdentificationCode": "",
		  "taxpayerName": "",
		  "taxpayerAddress": [], // 纳税人地区
		  "taxpayerFullAddress": "", // 纳税人详细地址
		  "taxpayerTel": "",
		  "taxpayerBankAccount": "",
		  "taxpayerBankAddress": [],
		  "taxpayerBankCode": [],

		  "drawer": "",
		  "payee": "",
		  "reviewer": "",
		  "revenueClassifyCode": "",
		  "taxRate": 0.0,
		  "codingName": "",
		  "isUsed": false,
		},
		rules: {
		  sPappid: [{required: true, message: '请输入s_pappid'}],
		  merchantNumber: [{required: true, message: '请输入商户识别码'}],

		  taxpayerIdentificationCode: [{required: true, message: '请输入纳税人识别码'}],
		  taxpayerName: [{required: true, message: '请输入纳税人名称'}],
		  taxpayerAddress: [{required: true, message: '请选择纳税人地区'}],
		  taxpayerFullAddress: [{required: true, message: '请输入纳税人详细地址'}],
		  taxpayerTel: [{validator: telTest},],
		  taxpayerBankAccount: [{required: true, message: '请输入纳税人银行账户'}],
		  taxpayerBankAddress: [{required: true, message: '请选择纳税人开户地区'}],
		  taxpayerBankCode: [{required: true, message: '请选择纳税人开户银行'}],

		  drawer: [{required: true, message: '请输入开票人'}],
		  payee: [{required: true, message: '请输入收款人'}],
		  reviewer: [{required: true, message: '请输入复核人'}],
		  revenueClassifyCode: [
			{required: true, message: '请输入税收分类编码'},
			{len: 19, message: '税收分类编码应为19位', trigger: 'blur'}
		  ],
		  taxRate: [{validator: taxRateTest}],
		  codingName: [{required: true, message: '请输入商品或服务名称'}],
		},

		addressOptions: [],
		taxpayerBankBlinkFlag: true, // 级联组件没有清除缓存功能，手动销毁重置
		branchMap: {},
		bankList: [],

		crumbsTexts: [{text: '微信公众平台'}, {text: '编辑电子发票'}],
	  };
	},
	async created() {
	  if (process.env.NODE_ENV === 'development') {
		await login({
		  account: 'qyf1card1',
		  password: '1card1',
		  rememberPassword: ''
		});
	  }
	  // this.initData();
	  await this.getAddress();
	  this.bankList = this.initialData.bankList.map(it => ({label: it.name, value: it.code, children: []}));
	},
	methods: {
	  async getAddress() {
		const result = await getAllMap();
		if (!result.success) {
		  return this.$message({
			message: '获取地址信息失败！',
			type: 'error'
		  });
		}
		this.addressOptions = fmtAddress(result.data);
	  },
	  bankAdsChange() {
		// 银行地址变动，清空开户银行
		if (this.formData.taxpayerBankCode.length) {
		  this.formData.taxpayerBankCode = [];
		}
		this.branchMap = {};
		this.bankList.forEach(it => it.children = []);
	  },

	  async handleItemChange(val) {
		const bankCode = val[0];
		if (this.branchMap[bankCode]) return;
		const cityCode = this.formData.taxpayerBankAddress[1];
		const result = await getBankBrach({bankCode, cityCode});
		if (!result.success) {
		  this.$message({message: '获取支行失败！', type: 'error'});
		  return;
		}
		this.branchMap[bankCode] = result.data.map(it => ({value: it.code, label: it.name}));
		const item = this.bankList.find(it => it.value === bankCode);
		if (!item) return;
		item.children = this.branchMap[bankCode];
	  },
	  async getBankList(node, resolve) {
		const {level} = node;
		console.log({...node});
		if (level === 0) {
		  return resolve(this.bankList);
		}
		const bankCode = node.value;
		const cityCode = this.formData.taxpayerBankAddress[1];
		const result = await getBankBrach({bankCode, cityCode});
		if (!result.success) {
		  this.$message({message: '获取支行失败！', type: 'error'});
		  return resolve([]);
		}
		resolve(result.data.map(it => ({value: it.code, label: it.name, leaf: true})));
	  },

	  onSaveAll() {
		this.$refs['form'].validate(valid => {
		  if (!valid) return;
		  this.submit();
		});
	  },

	  async submit() {
		console.log({...this.formData});
	  },

	  // region old code
	  initData() {
		let config = this.initialData.config;
		if (config.taxpayerAddress) {
		  this.taxpayerAddress = JSON.parse(config.taxpayerAddress);
		}
		if (config.taxpayerBank) {
		  this.taxpayerBank = JSON.parse(config.taxpayerBank);
		}
	  },
	  intiAddData(data) {
		let {area_code, city_code, province_code} = data;
		return {provinceId: province_code || 0, cityId: city_code || 0, countyId: area_code || 0};
	  },
	  async savePageData() {
		if (!this.verify()) {
		  return;
		}
		if (this.isSubmitIng) return;
		this.isSubmitIng;
		this.initialData.config.taxpayerAddress = JSON.stringify(this.taxpayerAddress);
		this.initialData.config.taxpayerBank = JSON.stringify(this.taxpayerBank);
		let res = await saveInvoice(this.initialData.config);
		if (res.success) {
		  this.$message('保存成功！', 1);
		}
		else {
		  this.$message(res.message);
		}
	  }
	  // endregion
	},
	computed: {},
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>

  fieldset {
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    padding: 0;
  }

  .set-invoice {
    font-size: @f14;
    min-width: 1100px;

    .edit-content {
      padding-left: 40px;
      padding-top: 10px;
      background-color: #fff;
    }

    .normal-input {
      width: 217px;
    }

    fieldset {
      margin-bottom: 10px;
      padding: 10px;

      legend {
        line-height: 2;
        color: #333;
        padding: 10px 0;
        margin-bottom: 10px;
        display: block;
        width: 100%;
        font-size: 17px;
        font-weight: bold;
        border-bottom: 1px solid #DCDFE6;
      }
    }

    .foot {
      display: flex;
      justify-content: center;
      padding-bottom: 50px;
    }
  }
</style>

<style>
  .x-toast .center {
    z-index: 100;
  }
</style>

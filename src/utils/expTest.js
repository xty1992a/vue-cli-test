/**
 * Created by TY-xie on 2017/12/8.
 */
export default {
    tel: {
        test(value) {
            return /^(0|86|17951)?(1)[0-9]{10}$/.test(value)
        }
    },
    allTel: { // 联系电话验证(支持手机号,区号-座机号,400- 开头的号码)
        test(value) {
            return /(1[0-9]{10})|(^0\d{2,3}-\d{7,8}$)|(^400-?\d{3}-?\d{4}$)/.test(value)
        }
    },
    checkcode: {
        test(value) {
            return /^\d{0,4}$/.test(value)
        }
    },
    psw: {
        test(value) {
            return /^([0-9]\d*)$/.test(value)
        }
    },
    qq: {
        test(value) {
            return /^\d{5,12}$/.test(value)
        }
    },
    email: {
        test(value) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
        }
    },
    idcard: {
        test(value) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
        }
    },
    money: {
        test(value) {
            return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
        }
    }
}

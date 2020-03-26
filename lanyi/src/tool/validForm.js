class ValidForm {

    // 验证用户名
    constructor() {
        // 必须字母开头,4-8个字符
        this.usernameReg = /^[A-Za-z]\w{3,7}$/;

        // 必须含有大写、小写、(字母数字_)组合，6-10位
        this.pwdReg = /^(?=.*[A-Z])(?=.*[a-z])\w{6,10}$/

        this.phoneReg = /^(13[0-9]|14[5|7]|15[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    }

    // 验证用户名
    validUsername(value) {
        return this.usernameReg.test(value);
    }

    // 验证手机号
    validPhone(value) {
        return this.phoneReg.test(value);
    }

    // 验证密码
    validPwd(value) {
        return this.pwdReg.test(value);
    }

    // 验证两值相等
    validEqual(v1,v2) {
        return v1 === v2;
    }
}

export const validForm = new ValidForm();
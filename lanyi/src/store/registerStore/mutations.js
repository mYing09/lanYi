export const mutations = {

    // 查看密码
    checkPassword(state,key) {
        // console.log('state[key].value ==> ',state[key].value);

        let isOpen = state[key].type === 'password';

        state[key].type = isOpen ? 'text' : 'password';

        state[key].icon = isOpen ? 'eye-o' : 'closed-eye';
    },

    // 点击注册
    register(state,pass) {
        state.isLoading = pass;
    },

    toggle(state) {
        state.checked = !state.checked;
    },

    // 验证用户名
    // validUsername(state,isValid) {
    //     console.log('isValid ==> ',isValid);
    //     state.user.errorMessage = isValid ? '' : '用户名支持4-8个字母数字或下划线';
    // },

    // 验证密码
    // validPwd(state,isValid) {
    //     console.log('isValid ==> ',isValid);
    //     state.pwd1.errorMessage = isValid ? '' : '密码支持6-10个字母数字或下划线，必须含有大小写';
    // },

    // 验证用户名或密码
    validUp(state,o) {
        state[o.key].errorMessage = o.isValid ? '' : o.errorMessage;
    },

    // 验证两值相等
    validEqual(state,isValid) {
        state.pwd2.errorMessage = isValid ? '' : '密码不一致,请重新输入';
    },

    // passForm
    passForm(state) {
        state.isValid = (state.user.errorMessage == '' && state.user.value != '') && (state.phone.errorMessage == '' && state.phone.value != '') && (state.pwd1.errorMessage == '' && state.pwd1.value != '') && (state.pwd2.errorMessage == '' && state.pwd2.value != '') && (state.pwd1.value == state.pwd2.value);
    }

}
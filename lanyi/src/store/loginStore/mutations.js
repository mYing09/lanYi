export const mutations = {

    // 点击登录
    login(state,pass) {
        state.isLoading = pass;
    },

    // 查看密码
    checkPassword(state,key) {
        // console.log('state[key].value ==> ',state[key].value);

        let isOpen = state[key].type === 'password';

        state[key].type = isOpen ? 'text' : 'password';

        state[key].icon = isOpen ? 'eye-o' : 'closed-eye';
    },

    // 验证用户名或密码
    validUp(state,o) {
        state[o.key].errorMessage = o.isValid ? '' : o.errorMessage;
    },

    // passForm
    passForm(state) {
        state.isValid = (state.user.errorMessage == '' && state.user.value != '') && (state.pwd1.errorMessage == '' && state.pwd1.value != '')
    }

}
<template>
  <div class="register">
    <div class="app-logo">
      <div class="logo"></div>
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="user.value"
          type="text"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="user.errorMessage"
          @input="validUp(user.value,'validUsername',{key:'user',errorMessage:'用户名支持4-8个字母数字或下划线，必须字母开头'})"
        />
        <van-field
          v-model="pwd1.value"
          :type="pwd1.type"
          label="密码"
          placeholder="请输入密码"
          :right-icon="pwd1.icon"
          :error-message="pwd1.errorMessage"
          @click-right-icon="checkPassword('pwd1')"
          @input="validUp(pwd1.value,'validPwd',{key:'pwd1',errorMessage:'密码支持6-10个字母数字或下划线，必须含有大小写'})"
        />
      </van-cell-group>
      <div class="register-form">
        <van-button
          :loading="isLoading"
          block
          class="register-btn"
          type="info"
          loading-text="登录中..."
          text="登录"
          @click="login()"
          :disabled="!isValid"
        />
      </div>
      <div class="login">
        没有账号？
        <router-link class="login-text" to="/register">快速注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { VaildForm, validForm } from "../tool/validForm";

import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("loginModule");

export default {
  name: "login",

  computed: {
    ...mapState(["isLoading", "user", "pwd1", "isValid"])
  },

  methods: {
    ...mapMutations(["checkPassword"]),

    // 登录
    login() {
      this.$store.commit("loginModule/login", true);

      let randomTime = Math.random() * 5 * 1000;

      setTimeout(() => {

        // 获取所有用户
        let users = localStorage.getItem('users');

        users = users ? JSON.parse(users) : [];

        if(users.length === 0) {
            
            this.$toast({
                duration: 2000,
                message: '该用户不存在'
            })

            this.$store.commit("loginModule/login", false);
            return;
        }

        // 查找用户
        for(let i = 0;i < users.length;i++) {

            if(users[i].username == this.user.value) {

                // 如果该用户存在，匹配密码
                if(users[i].pwd == this.pwd1.value) {
                    this.$toast({
                        duration: 2000,
                        message: '登录成功'
                    })
                    this.$store.commit("loginModule/login", false);
                    
                    // 跳转到首页
                    // 记录用户登录状态
                    let user = {
                      isLogin: true,
                      username: this.user.value
                    };

                    localStorage.setItem('user', JSON.stringify(user));

                    return this.$router.push({name: 'home'});
                }else{
                    this.$toast({
                        duration: 2000,
                        message: '用户名或密码不正确'
                    })
                    this.$store.commit("loginModule/login", false);
                    return;
                }
            }

        }

        // 用户不存在
        this.$toast({
            duration: 2000,
            message: '该用户不存在'
        })

        this.$store.commit("loginModule/login", false);
          
      },randomTime)

    },

    // 验证用户名或密码
    validUp(value, fnName, o) {
      let isValid = validForm[fnName](value);

      o.isValid = isValid;

      this.$store.commit("loginModule/validUp", o);

      this.$store.commit("loginModule/passForm");
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  .app-logo {
    height: 5.33rem;
    position: relative;
    background: url(../assets/image/01.jpg) no-repeat center center;
    background-size: cover;
    .logo {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background: #fff url(../assets/image/03.jpg) no-repeat center center;
      background-size: contain;
      width: 2.13rem;
      height: 2.13rem;
      border-radius: 50%;
      box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3);
    }
  }
  .agree {
    padding: 20px 10px;
    span {
      color: #00b0f0;
    }
  }
  .register-form {
    padding: 10px;
  }
  .register-btn {
    margin-top: 20px;
  }
  .login {
    margin-top: 5px;
    text-align: center;
    color: #666;
    .login-text {
      color: #00a2e8;
    }
  }
}
</style>
<template>
  <div class="register">
    <div class="app-logo">
      <!-- <div class="logo"></div> -->
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
          type="text"
          v-model="phone.value"
          label="手机号"
          placeholder="请输入手机号"
          :error-message="phone.errorMessage"
          @input="validUp(phone.value,'validPhone',{key:'phone',errorMessage:'请输入正确格式的手机号'})"
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
        <van-field
          v-model="pwd2.value"
          :type="pwd2.type"
          label="确认密码"
          placeholder="请再次输入密码"
          :right-icon="pwd2.icon"
          :error-message="pwd2.errorMessage"
          @click-right-icon="checkPassword('pwd2')"
          @input="validEqual(pwd1.value,pwd2.value)"
        />
      </van-cell-group>
      <!-- <div class="agree">
        <van-checkbox v-model="checked" @click="toggle()" shape="square">我已阅读并同意<span>《岚亦电影服务协议》</span></van-checkbox>
      </div> -->
      <div class="register-form">
        <van-button
          :loading="isLoading"
          block
          class="register-btn"
          type="info"
          loading-text="注册中..."
          text="注册"
          @click="register()"
          :disabled="!isValid"
        />
      </div>
      <div class="login">已有账号？<router-link class="login-text" to="/login">登录</router-link></div>
    </div>
    
  </div>
</template>

<script>

  import {VaildForm, validForm} from '../tool/validForm'

  import {createNamespacedHelpers} from 'vuex'

  const {mapState,mapMutations} = createNamespacedHelpers('registerModule');

  export default {
    name: 'register',

    data() {
      return {
        checked: false,
      }
    },

    // 计算属性
    computed: {
      ...mapState([
        'pwd1',
        'pwd2',
        'isLoading',
        'isValid',
        'user',
        'phone'
      ])
    },

    // 方法
    methods: {
      ...mapMutations(
        ['checkPassword']
      ),

      ...mapMutations(
        ['toggle']
      ),

      register() {
        
        let self = this;

        // 注册
        this.$store.commit('registerModule/register',true);

        let randomTime = Math.random() * 5 * 1000;

        setTimeout(function() {

          // 获取所有用户信息
          let users = localStorage.getItem('users');

          users = users ? JSON.parse(users) : [];

          // console.log('users ==> ',users);

          // 当前用户是否存在
          for(let i = 0;i < users.length;i++) {
            if(users[i].username == self.user.value) {
              
              self.$toast({
                duration: 2000,
                message: '该用户已存在'
              })
              
              self.$store.commit('registerModule/register',false);

              return;
            }
          }

          self.$toast({
            duration: 2000,
            message: '注册成功'
          })

          self.$store.commit('registerModule/register',false); 

          let time = new Date().getTime();

          // 记录用户信息
          let userInformation = {
            // 用户名
            username: self.user.value,
            // 手机
            handset: self.phone.value,
            // 密码
            pwd: self.pwd1.value,
            // 注册时间
            time
          };

          // 将当前用户信息推入users
          users.push(userInformation);

          // 写入本地存储中，模拟数据库
          localStorage.setItem('users',JSON.stringify(users));

          // 跳转到登录页面
          self.$router.push({name: 'login'});

        },randomTime)

      },

      // 输入验证表单
      // validUsername(value) {
      //   let isValid = validForm.validUsername(value);

      //   this.$store.commit('registerModule/validUsername',isValid);

      // },

      // 验证密码
      // validPwd(value) {
      //   let isValid = validForm.validPwd(value);

      //   this.$store.commit('registerModule/validPwd',isValid);
      // },

      // 验证用户名或密码
      validUp(value,fnName,o) {
        let isValid = validForm[fnName](value);

        o.isValid = isValid;

        this.$store.commit('registerModule/validUp',o);

        this.$store.commit('registerModule/passForm');
      },

      // 验证两值相等
      validEqual(v1,v2) {
        let isValid = validForm.validEqual(v1,v2);

        this.$store.commit('registerModule/validEqual',isValid);;

        this.$store.commit('registerModule/passForm');
      }
    }
  }
</script>

<style lang="less" scoped>
  .register{
    .app-logo{
      height: 5.33rem;
      position: relative;
      background: url(../assets/image/02.png) no-repeat center center;
      background-size: cover;
      .logo{
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
        box-shadow: 0 0 0 5px rgba(255,255,255,.3);
      }
    }
    .agree{
      padding: 20px 10px;
      span{
        color: #00B0F0;
      }
    }
    .register-form{
      padding: 10px;
    }
    .register-btn{
      margin-top: 20px;
    }
    .login{
      margin-top: 5px;
      text-align: center;
      color: #666;
      .login-text{
        color: #00A2E8;
      }
    }
  }
</style>

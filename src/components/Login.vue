
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.jpg" alt />
      </div>
      <!-- 登录表单 -->
      <el-form
        ref="form"
        :model="form"
        :rules="loginFromRules"
        label-width="0px"
        class="login_form"
      >
        <span class="moren">默认账户:5555,密码:5555</span>
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="iconfont icon-users"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="iconfont icon-lock_fill" type="password"></el-input>
        </el-form-item>
        <el-form-item v-show="isRegister" prop="nickname">
          <el-input placeholder="昵称" v-model.trim="form.nickname"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="onSubmit">{{isRegister ? '注册': '登录'}}</el-button>
          <el-button type="info" @click="resetLoginForm">取消</el-button>
        </el-form-item>
        <p class="login-link">
          <router-link v-if="isRegister" to="/login">已有账号？去登录</router-link>
          <router-link v-else to="/register">没有账号？去注册</router-link>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
const publicPath = process.env.BASE_URL;
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname: ""
      },
      loginFromRules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 15,
            message: "密码长度在 4 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    isRegister() {
      return this.$route.path === "/register";
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.form.resetFields();
    },

    ...mapActions(["registerUser", "onLogin"]),
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.login();
          if (this.isRegister) {
            // 注册
            this.registerUser(this.form)
              .then(() => {
                this.onLogin(this.form)
                this.$message.success("注册成功");
              })
              .then(() => {
                this.$router.push("/home");
                this.$message.success("登录成功，欢迎您");
              });
          } else {
            this.onLogin(this.form).then(res => {
              if (res == 666) {
                this.$message.error("账户或密码错误");
              } else {
                this.$router.push("/home");
                this.$message.success("登录成功，欢迎您");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    login() {
      this.$http
        .post("login", {
          username: "admin",
          password: '123456'
        })
        .then(res => {
           window.sessionStorage.setItem('token',res.data.data.token)
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #ea5420;
  height: 100%;
  background-image: url("../assets/1.png");
  background-repeat: no-repeat;
  // background: no-repeat;
  background-size: 80% 100%;
}
.moren {
  color: cornflowerblue;
}
.login_box {
  width: 500px;
  height: 350px;
  // background-color:rgba(1, 38, 113, 0.5) ;
  background-color: #fff;
  box-shadow: 0 0 3px #4e72ec;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(25%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .el-input {
    border: 1px solid #cccccc;
    border-radius: 10px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

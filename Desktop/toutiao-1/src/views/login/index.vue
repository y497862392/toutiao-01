<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field name="mobile" v-model="user.mobile" placeholder="请输入手机号" type="number" :rules="userFormRules.mobile"
        maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number"
        maxlength="6"><i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down 
          v-if="isCountDownShow"
          :time="1000 * 60" 
          format="ss s"
          @finish="isCountDownShow = flase">
        </van-count-down>
          <van-button
          v-else 
          class="send-sms-btn"
          native-type="button"
           round size="small" 
           type="default"
           @click="onSendSms"
           >发送验证码</van-button>
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login,sendSms } from '@/api/user';

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "246810",
        
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }
          , {
          pattern: /^\d{6}$/,
          message: '请输入正确的验证码',


        }],
        
      },
      isCountDownShow: false
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0,
      } )
      try {
        const {data} = await login(user)
        this.$store.commit('setUser',data.data)    
        this.$toast.success('登陆成功')      
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机或验证码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
    },
     async onSendSms() {
      console.log("onSendSms")

      try {
        await this.$refs.loginForm.validateField('mobile')
        console.log("验证成功")
      } catch (err) {
        return console.log("验证失败", err)
      }
       this.isCountDownShow = true

       try {
        const res = await sendSms(this.user.mobile)
         this.$toast.success('发送验证码成功',res)
       } catch (err) {
        this.isCountDownShow = false
         if (err.response.status === 429) {
           this.$toast.fail('请求过于频繁，请稍后再试')
         } else {
          this.$toast.fail('发送验证码失败')
        }
       }
    }
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.login-container {
  .toutiao {
    font-size: 37px;
  }
}

.send-sms-btn {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 160px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  color: #666;
}

.login-btn-warp {
  padding: 53px 33px;

  .login-btn {
    background-color: #6db4fb;
    border: none
  }
}
</style>
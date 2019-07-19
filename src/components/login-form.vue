<template>
  <Form ref="loginForm" :model="form" :rules="formRules" @keydown.enter.native="handleSubmit">
    <FormItem prop="account">
      <Input
        class="login-input"
        size="large"
        v-model="form.account"
        placeholder="账号/手机号"
        autocomplete="off"
        :maxlength="11"
      />
    </FormItem>
    <FormItem prop="password">
      <Input
        class="login-input"
        size="large"
        type="password"
        v-model="form.password"
        placeholder="请输入密码,6-16位"
        autocomplete="off"
        :maxlength="30"
      />
    </FormItem>
    <Row class="attach-line">
      <Col span="12" style="text-align:left;">
        <Checkbox v-model="form.rememberme">记住账号</Checkbox>
      </Col>
      <Col span="12" style="text-align:right;">
        <span class="forget" @click="ForgetPassswordTip">忘记密码</span>
      </Col>
    </Row>
    <FormItem class="login-btn-div">
      <Button
        @click="handleSubmit"
        type="primary"
        class="login-btn"
        size="large"
        long
        :disabled="disabled || (form.account == ''|| form.password == '')"
      >登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import mixinEncrypt from '@/libs/mixinEncrypt.js'
export default {
  props: {
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const requiredAccount = {
      required: true,
      message: '账号不能为空',
      trigger: 'blur'
    }
    const requiredPwd = {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
    const accountValid = (rule, value, callback) => {
      if (!/(^[a-zA-Z][a-zA-Z0-9_\-]{1,9}$)|(^1[3-9][\d]{9}$)/.test(value)) {
        callback(new Error('账号格式错误'))
      } else {
        callback()
      }
    }
    const passwordValid = (rule, value, callback) => {
      if (
        !/^[a-zA-Z0-9_,;'"~#@&%\!\^\$\.\*\+\?\-\=\|\\\/\:\<\>]{6,30}$/.test(
          value
        )
      ) {
        callback(new Error('密码格式错误'))
      } else {
        callback()
      }
    }

    return {
      form: {
        account: '',
        password: '',
        rememberme: false
      },
      formRules: {
        account: [
          requiredAccount,
          { validator: accountValid, trigger: 'blur' }
        ],
        password: [requiredPwd, { validator: passwordValid, trigger: 'blur' }]
      }
    }
  },
  created() {
    var loginUser = this.$storage.getLocalObj(this.$appConfig.appLUName)
    if (loginUser) {
      this.form.account = loginUser.username
      this.form.password = mixinEncrypt.unEncrypt(loginUser.password)
      this.form.rememberme = true
    }
  },
  computed: {
    rules() {
      return {
        account: this.accountRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            account: this.form.account,
            password: this.form.password,
            rememberme: this.form.rememberme
          })
        }
      })
    },
    ForgetPassswordTip() {
      this.$Modal.info({
        title: '温馨提示',
        content:
          "<p style='padding-right: 42px;'>忘记密码，请联系技术支持：0851-8586&nbsp5111完成密码找回！</p>"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.attach-line {
  padding-top: 10px;
  margin-bottom: 51px;
}
.attach-line .ivu-checkbox-wrapper {
  font-size: 16px;
}
.attach-line .forget {
  font-size: 16px;
  color: #108ff5;
  cursor: pointer;
}

.login-btn.ivu-btn-large {
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.login-btn-div {
  margin-bottom: 57px;
  button.un-login {
    background-color: #d5d5d5;
    border-color: #e9e9e9;
  }

  button.un-login:hover {
    background-color: #d5d5d5 !important;
    border-color: #e9e9e9 !important;
  }
}
.ivu-modal-confirm-body {
  padding-left: 0px !important;
}
</style>

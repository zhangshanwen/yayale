<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">{{$t('i18n.backendSystem')}}</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="mobile">
                    <el-input v-model="param.mobile" placeholder="mobile">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="param.password">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @keyup.enter.native="submitForm()" @click="submitForm()">{{$t('login')}}
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { login } from '../../api/login';
    import { setToken } from '../../utils/auth';

    export default {
        data: function() {
            return {
                param: {
                    mobile: process.env.VUE_APP_MOBILE,
                    password: process.env.VUE_APP_PASSWORD
                },
                rules: {
                    mobile: [{ required: true, message: this.$t('plsInputMobile'), trigger: 'blur' }],
                    password: [{ required: true, message: this.$t('plsInputPassword'), trigger: 'blur' }]
                }
            };
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        login(this.param.mobile, this.param.password).then(async res => {
                            localStorage.setItem('ms_mobile', this.param.mobile);
                            console.log(res.data)
                            setToken(res.data.Authorization);
                            await this.$router.push('/users');
                        }).catch(err => {
                            this.$message.error(this.$t(`code.${err.msg}`));
                        });
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>

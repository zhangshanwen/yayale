<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChange">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">{{$t('i18n.backendSystem')}}</div>
        <div class="header-right">
            <div class="header-user-con">

                <div class="user-avator">
                    <img src="../../assets/img/img.jpg"/>
                </div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="logout">{{$t('i18n.logout')}}</el-dropdown-item>
                        <el-dropdown-item divided command="changePassword">{{$t('i18n.changePassword')}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog
                :title="$t('i18n.changePassword')"
                :visible.sync="changePasswordVisible"
                width="30%"
                center>
            <el-form :model="form" ref="changePassword" :rules="rules">
                <el-form-item :label="$t('field.password')">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>

            </el-form>

            <el-button @click="saveVisible = false">{{$t('i18n.cancel')}}</el-button>
            <el-button type="primary" :disabled="changePasswordDisable" @click="onchangePassword()">
                {{$t('i18n.confirm')}}
            </el-button>
        </el-dialog>
    </div>

</template>
<script>
    import { logout } from '../../api/login';
    import { changePassword } from '../../api/users';
    import bus from '../common/bus';
    import { removeToken } from '../../utils/auth';

    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                changePasswordVisible: false,
                name: 'admin',
                form: {
                    'password': ''
                },
                rules: []
            };
        },
        computed: {
            username() {
                let username = localStorage.getItem('ms_user_name');
                return username ? username : this.name;
            },
            changePasswordDisable() {
                return this.form.password === '';
            }
        },
        methods: {
            // 用户名下拉菜单选择事件
            async handleCommand(command) {
                if (command === 'logout') {
                    await logout();
                    localStorage.removeItem('ms_user_name');
                    await removeToken();
                    await this.$router.push('/login');
                } else if (command === 'changePassword') {
                    this.changePasswordVisible = true;
                }
            },
            changeLanguage() {
                if (this.$i18n.locale === 'zh') {
                    this.$i18n.locale = 'en';
                } else {
                    this.$i18n.locale = 'zh';
                }
            },
            collapseChange() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            changeLocale(type) {
                this.$locale = type;
            },
            onchangePassword() {
                changePassword(this.form.password).then(res => {
                    removeToken();
                    this.$router.push('/login');
                }).catch(err => {
                    this.$message.error(this.$t(`code.${err.msg}`));
                });
            }
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChange();
            }
        }
    };
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }

    .header .logo {
        float: left;
        width: 400px;
        line-height: 70px;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }

    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }

    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>

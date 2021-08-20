<template>
    <div>
        <div class="contain">
            <el-button type="primary" @click="clickNewData()">{{$t('i18n.new')}}</el-button>
            <el-divider></el-divider>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    stripe
                    highlight-current-row
                    header-cell-class-name="table-header-class"
                    style="width:100%">
                <el-table-column :label="$t('field.id')"
                                 property="id"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.user_name')"
                                 property="user_name"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.mobile')"
                                 property="mobile"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.last_login_time')"
                                 property="last_login_time"
                                 :formatter="formatterTime"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.updated_time')"
                                 property="updated_time"
                                 :formatter="formatterTime"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.created_time')"
                                 property="created_time"
                                 :formatter="formatterTime"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('i18n.operate')"
                                 align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="clickResetPassword(scope.row.id)">{{$t('i18n.resetPassword')}}
                        </el-button>
                        <el-button type="text" @click=clickEditData(scope.row)>{{$t('i18n.edit')}}</el-button>
                        <el-button type="text" @click="clickDeleteData(scope.row.id)">{{$t('i18n.delete')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                                v-if='paginations.total > 0'
                                :page-sizes="paginations.pageSizes"
                                :page-size="paginations.pageSize"
                                :layout="paginations.layout"
                                :total="paginations.total"
                                :current-page='paginations.pageIndex'
                                @current-change='handleCurrentChange'
                                @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog
                :title="isEdit? $t('i18n.edit'):$t('i18n.new')"
                :visible.sync="saveVisible"
                width="30%"
                center>
            <el-form :model="form" :rules="rules">
                <el-form-item :label="$t('field.id')" v-if="isEdit">
                    <el-input disabled v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.user_name')" prop="user_name">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.mobile')" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item v-if="!isEdit" :label="$t('field.password')">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>

            </el-form>

            <el-button @click="saveVisible = false">{{$t('i18n.cancel')}}</el-button>
            <el-button v-if="isEdit" type="primary" :disabled="isEditDisable" @click="editData()">{{$t('i18n.confirm')}}
            </el-button>
            <el-button v-else type="primary" :disabled="isNewDisable" @click="newData()">{{$t('i18n.confirm')}}
            </el-button>
        </el-dialog>
        <el-dialog :title="$t('i18n.delete')" :visible.sync="delVisible" width="20%">
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delVisible = false">{{$t('i18n.cancel')}}</el-button>
                <el-button type="primary" @click="deleteOne()">{{$t('i18n.confirm')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="$t('i18n.resetPassword')" :visible.sync="resetPasswordVisible" width="20%">
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resetPasswordVisible = false">{{$t('i18n.cancel')}}</el-button>
                <el-button type="primary" @click="resetPassword()">{{$t('i18n.confirm')}}</el-button>
            </div>
        </el-dialog>

    </div>


</template>

<script>
    import { users, userCreate, userEdit, userDelete, resetUserPassword } from '../../api/users';
    import { FormatterTime } from '../../utils/time';

    export default {
        name: 'users',
        data() {
            return {
                paginations: {
                    total: 0,
                    pageIndex: 1,
                    pageSize: 20,
                    pageSizes: [10, 20, 50, 100, 300, 1000],
                    layout: 'total, sizes, prev, pager, next, jumper',
                    sort: 0,
                    order: 'id'

                },
                loading: false,
                saveVisible: false,
                delVisible: false,
                resetPasswordVisible: false,
                isEdit: false,
                form: {
                    id: '',
                    user_name: '',
                    mobile: '',
                    password: ''
                },
                tableData: [],
                rules: {
                    user_name: [{ required: true, message: this.$t('i18n.plsInputUsername'), trigger: 'blur' }],
                    mobile: [{ required: true, message: this.$t('i18n.plsInputMobile'), trigger: 'blur' }]
                }
            };
        },
        methods: {
            async loadData() {
                this.loading = true;
                users(this.paginations.pageIndex, this.paginations.pageSize, this.paginations.sort, this.paginations.order).then(
                    (res) => {
                        this.tableData = res.data.list;
                        this.paginations.total = res.data.pagination.total;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));

                })).finally(() => {
                    this.loading = false;
                });

            },
            clickNewData() {
                this.form = {
                    mobile: '',
                    user_name: '',
                    password: ''
                };
                this.saveVisible = true;
                this.isEdit = false;
            },
            clickEditData(row) {
                this.form = {
                    id: row.id,
                    mobile: row.mobile,
                    user_name: row.user_name,
                    row: row
                };
                this.saveVisible = true;
                this.isEdit = true;
            },
            clickDeleteData(operate_id) {
                this.form = {
                    id: operate_id
                };
                this.delVisible = true;
            },
            clickResetPassword(operate_id) {
                this.form = {
                    id: operate_id
                };
                this.resetPasswordVisible = true;
            },
            newData() {
                userCreate(this.form).then((res) => {
                        this.saveVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));

                }));
            },
            editData() {
                userEdit(this.form).then((res) => {
                        this.form.row.user_name = res.data.user_name;
                        this.form.row.mobile = res.data.mobile;
                        this.form.row.updated_time = res.data.updated_time;
                        this.saveVisible = false;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));
                }));
            },
            deleteOne() {
                userDelete(this.form.id).then((res) => {
                        this.delVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));
                }));
            },
            resetPassword() {
                resetUserPassword(this.form.id).then((res) => {
                        this.resetPasswordVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));
                }));
            },
            // 每页多少条切换
            async handleSizeChange(pageSize) {
                this.paginations.pageSize = pageSize;
                await this.loadData();
            },
            // 上下分页
            async handleCurrentChange(page) {
                this.paginations.pageIndex = page;
                await this.loadData();
            },
            formatterTime(row, column, cellValue, index) {
                return FormatterTime(row, column, cellValue, index);
            }
        },
        created() {
            this.loadData();
        },
        computed: {
            isNewDisable() {
                return this.form.user_name === '' || this.form.mobile === '' || this.form.password === '';
            },
            isEditDisable() {
                return this.form.user_name === '' || this.form.mobile === '';
            }
        }
    };
</script>

<style scoped>

    .contain {
        background: #fff;
        padding: 10px;
        margin-bottom: 20px;
    }


</style>




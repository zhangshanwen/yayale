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
                <el-table-column :label="$t('field.type')"
                                 property="type"
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
                <el-form-item :label="$t('field.type')" prop="type">
                    <el-input v-model="form.type"></el-input>
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
    </div>


</template>

<script>
    import { getCategory, categoryCreate, categoryEdit, categoryDelete } from '../../api/goodsCategory';
    import { FormatterTime, FormatterDate } from '../../utils/time';

    export default {
        name: 'goodsCategory',
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
                isEdit: false,
                form: {
                    id: '',
                    type: ''
                },
                tableData: [],
                rules: {
                    type: [{ required: true, message: this.$t('i18n.plsInputName'), trigger: 'blur' }]
                },
                options: []
            };
        },
        methods: {
            async loadData() {
                this.loading = true;
                getCategory(this.paginations.pageIndex, this.paginations.pageSize, this.paginations.sort, this.paginations.order).then(
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
                    type: ''
                };
                this.saveVisible = true;
                this.isEdit = false;
            },
            async clickEditData(row) {
                this.form = {
                    id: row.id,
                    type: row.type,
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
            newData() {
                categoryCreate(this.form).then((res) => {
                        this.saveVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));

                }));
            },
            editData() {
                categoryEdit(this.form).then((res) => {
                        this.saveVisible = false;
                        // 优化根据返回回填属性?因为懒得写
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));
                }));
            },
            deleteOne() {
                categoryDelete(this.form.id).then((res) => {
                        this.delVisible = false;
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
            },
            formatterDate(row, column, cellValue, index) {
                return FormatterDate(row, column, cellValue, index);
            }
        },
        created() {
            this.loadData();
        },
        computed: {
            isNewDisable() {
                return this.form.type === '';
            },
            isEditDisable() {
                return this.form.type === '';
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




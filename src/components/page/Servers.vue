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
                <el-table-column :label="$t('field.address')"
                                 property="address"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.nick_name')"
                                 property="nick_name"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.intro')"
                                 property="intro"
                                 align="center">

                </el-table-column>
                <el-table-column :label="$t('field.ping')"
                                 align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.ping ? 'success' : 'danger'"
                                effect="dark"
                                disable-transitions>{{$t(`field.${scope.row.ping ? 'normal':'invalid'}`)}}
                        </el-tag>
                    </template>

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
                :title="isEdit? $t('i18n.new'):$t('i18n.edit')"
                :visible.sync="saveVisible"
                width="30%"
                center>
            <el-form :model="form">
                <el-form-item :label="$t('field.id')" v-if="isEdit">
                    <el-input disabled v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.address')">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.nick_name')">
                    <el-input v-model="form.nick_name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.intro')">
                    <el-input v-model="form.intro"></el-input>
                </el-form-item>

            </el-form>

            <el-button @click="saveVisible = false">{{$t('i18n.cancel')}}</el-button>
            <el-button v-if="isEdit" type="primary" @click="editData()">{{$t('i18n.cancel')}}</el-button>
            <el-button v-else type="primary" @click="newData()">{{$t('i18n.confirm')}}</el-button>
        </el-dialog>
        <el-dialog :title="$t('i18n.delete')" :visible.sync="delVisible" width="20%">
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ddelVisible = false">{{$t('i18n.cancel')}}</el-button>
                <el-button type="primary" @click="deleteOne()">{{$t('i18n.confirm')}}</el-button>
            </div>
        </el-dialog>

    </div>


</template>

<script>
    import { servers, serverCreate, serverEdit, serverDelete } from '../../api/servers';
    import { FormatterTime } from '../../utils/time';

    export default {
        name: 'servers',
        data() {
            return {
                paginations: {
                    total: 0,
                    pageIndex: 1,
                    pageSize: 20,
                    pageSizes: [10, 20, 50, 100, 300, 1000],
                    layout: 'total, sizes, prev, pager, next, jumper',
                    sort: '',
                    asc: ''

                },
                loading: false,
                saveVisible: false,
                delVisible: false,
                isEdit: false,
                form: {
                    id: '',
                    address: '',
                    nick_name: '',
                    intro: ''
                },
                tableData: []
            };
        },
        methods: {
            async loadData() {
                this.loading = true;
                servers(this.paginations.pageIndex, this.paginations.pageSize, this.paginations.sort, this.paginations.asc).then(
                    (res) => {
                        this.tableData = res.data.list;
                        this.paginations.total = res.data.pagination.total;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.code}`));
                })).finally(() => {
                    this.loading = false;
                });

            },
            clickNewData() {
                this.form = {
                    address: '',
                    nick_name: '',
                    intro: ''
                };
                this.saveVisible = true;
                this.isEdit = false;
            },
            clickEditData(row) {
                this.form = {
                    id: row.id,
                    address: row.address,
                    nick_name: row.nick_name,
                    intro: row.intro,
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
                serverCreate(this.form.address, this.form.nick_name, this.form.intro).then((res) => {
                        this.saveVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.code}`));
                }));
            },
            editData() {
                serverEdit(this.form.id, this.form.address, this.form.nick_name, this.form.intro).then((res) => {
                        this.form.row.address = res.data.address;
                        this.form.row.nick_name = res.data.nick_name;
                        this.form.row.intro = res.data.intro;
                        this.form.row.updated_time = res.data.updated_time;
                        this.saveVisible = false;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.code}`));
                }));
            },
            deleteOne() {
                serverDelete(this.form.id).then((res) => {
                        this.delVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.code}`));
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




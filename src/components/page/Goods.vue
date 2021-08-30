<template>
    <div>
        <div class="contain">
            <el-form :model="searchForm" inline>
                <el-form-item :label="$t('i18n.keyword')">
                    <el-input v-model="searchForm.keyword"
                              clearable
                              :placeholder="$t('i18n.plsInputNameProducerNumber')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.category_id')">
                    <el-select v-model="searchForm.category_id" :placeholder="$t('i18n.plsChoose')">
                        <el-option :label="$t('i18n.all')" :value="0"></el-option>
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.type"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="loadData()">{{$t('i18n.search')}}</el-button>
            </el-form>
            <el-button type="primary" @click="clickNewData()">{{$t('i18n.new')}}</el-button>
            <el-button type="primary" @click="clickNewCategory()">{{$t('i18n.goodsCategory')}}</el-button>
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
                <el-table-column :label="$t('field.name')"
                                 property="name"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.producer')"
                                 property="producer"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.number')"
                                 property="number"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.specification')"
                                 property="specification"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.unit')"
                                 property="unit"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.inventory_count')"
                                 property="inventory_count"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.type')"
                                 property="type"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.expired_time')"
                                 property="expired_time"
                                 :formatter="formatterDate"
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
                <el-table-column :label="$t('i18n.outInPut')"
                                 align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click=clickLoadRecordData(scope.row.id)>{{$t('i18n.record')}}
                        </el-button>
                        <el-button type="text" @click=clickOutInput(scope.row.id)>{{$t('i18n.outInPut')}}</el-button>
                    </template>
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
                <el-form-item :label="$t('field.name')" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.producer')" prop="producer">
                    <el-input v-model="form.producer"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.number')" prop="number">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.specification')" prop="specification">
                    <el-input v-model="form.specification"></el-input>
                </el-form-item>
                <el-form-item :label="$t('field.unit')" prop="unit">
                    <el-input v-model="form.unit"></el-input>
                </el-form-item>
                <el-form-item v-if="isEdit" :label="$t('field.inventory_count')" prop="inventory_counts">
                    <el-input-number disabled v-model="form.inventory_count"></el-input-number>
                </el-form-item>
                <el-form-item :label="$t('field.category_id')" prop="category_id">
                    <el-select v-model="form.category_id" filterable :placeholder="$t('i18n.plsChoose')">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('field.expired_time')" prop="expired_time">
                    <el-date-picker align="right"
                                    type="date"
                                    :placeholder="$t('i18n.plsChooseDate')"
                                    :picker-options="pickerOptions" v-model="form.expired_time"></el-date-picker>
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

        <el-dialog :title="$t('i18n.outInPut')" :visible.sync="record.recordVisible"
                   width="30%">
            <el-form :model="record">
                <el-form-item :label="$t('field.inventory_count')" prop="inventory_count">
                    <el-input-number :min="0" :precision="0" v-model="record.inventory_count"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-radio v-model="record.state" :label="1">{{$t('i18n.input')}}</el-radio>
                    <el-radio v-model="record.state" :label="-1">{{$t('i18n.output')}}</el-radio>
                </el-form-item>
                <el-form-item :label="$t('field.remake')" prop="remake">
                    <el-input v-model="record.remake"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="record.recordVisible = false">{{$t('i18n.cancel')}}</el-button>
                <el-button type="primary" @click="creteRecord()">{{$t('i18n.confirm')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="$t('title.record')" :visible.sync="records.recordVisible">
            <el-form :model="records" inline>
                <el-form-item :label="$t('field.state')">
                    <el-select v-model="records.state" :placeholder="$t('i18n.plsChoose')">
                        <el-option
                                v-for="item in recordsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="loadRecordData()">{{$t('i18n.search')}}</el-button>
            </el-form>
            <el-divider></el-divider>
            <el-table
                    v-loading="records.loading"
                    :data="records.tableData"
                    border
                    stripe
                    highlight-current-row
                    header-cell-class-name="table-header-class"
                    style="width:100%">
                <el-table-column :label="$t('field.id')"
                                 property="id"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.inventory_count')"
                                 property="inventory_count"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.goods_name')"
                                 property="name"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.state')"
                                 property="state"
                                 :formatter="formatterState"
                                 align="center">
                </el-table-column>

                <el-table-column :label="$t('field.remark')"
                                 property="remark"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.operator')"
                                 property="user_name"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.operation_time')"
                                 property="operation_time"
                                 :formatter="formatterTime"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.created_time')"
                                 property="created_time"
                                 :formatter="formatterTime"
                                 align="center">
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                                v-if='recordPaginations.total > 0'
                                :page-sizes="recordPaginations.pageSizes"
                                :page-size="recordPaginations.pageSize"
                                :layout="recordPaginations.layout"
                                :total="recordPaginations.total"
                                :current-page='recordPaginations.pageIndex'
                                @current-change='handleRecordCurrentChange'
                                @size-change='handleRecordSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>

    </div>


</template>

<script>
    import { getGoods, goodsCreate, goodsEdit, goodsDelete } from '../../api/goods';
    import { getCategory, categoryCreate, categoryEdit, categoryDelete } from '../../api/goodsCategory';
    import { getRecord, recordCreate } from '../../api/record';
    import { FormatterTime, FormatterDate } from '../../utils/time';
    import bus from '../common/bus';

    export default {
        name: 'goods',
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
                recordPaginations: {
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
                searchForm: {
                    category_id: 0,
                    keyword: ''

                },
                form: {
                    id: '',
                    name: '',
                    producer: '',
                    number: '',
                    category_id: '',
                    expired_time: '',
                    specification: '',
                    unit: ''
                },
                record: {
                    goods_id: 0,
                    state: 1,
                    remake: '',
                    inventory_count: 0,
                    recordVisible: false
                },
                recordsOptions: [
                    { label: this.$t('i18n.all'), value: 0 },
                    { label: this.$t('i18n.input'), value: 1 },
                    { label: this.$t('i18n.output'), value: -1 }
                ],
                records: {
                    tableData: [],
                    loading: false,
                    state: 0,
                    goods_id: 0,
                    recordVisible: false
                },
                tableData: [],
                rules: {
                    name: [{ required: true, message: this.$t('i18n.plsInputName'), trigger: 'blur' }]
                },
                options: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() <= Date.now();
                    },
                    shortcuts: [{
                        text: this.$t('i18n.oneMonthAfter'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: this.$t('i18n.threeMonthAfter'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30 * 3);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: this.$t('i18n.halfYearAfter'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30 * 6);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: this.$t('i18n.oneYearAfter'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30 * 12);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: this.$t('i18n.twoYearAfter'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30 * 12 * 2);
                            picker.$emit('pick', date);
                        }
                    }
                    ]
                }
            };
        },
        methods: {
            async loadData() {
                this.loading = true;
                getGoods(this.paginations, this.searchForm).then(
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
            async clickLoadRecordData(goods_id) {
                this.records.goods_id = goods_id;
                this.records.recordVisible = true;
                await this.loadRecordData();
            },
            async loadRecordData() {
                this.records.loading = true;
                getRecord(this.recordPaginations, this.records).then(
                    (res) => {
                        this.records.tableData = res.data.list;
                        this.recordPaginations.total = res.data.pagination.total;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));

                })).finally(() => {
                    this.records.loading = false;
                });
            },
            clickNewData() {
                this.form = {
                    name: '板蓝根',
                    producer: '东南大仓',
                    number: '12311d1',
                    category_id: '',
                    expired_time: '',
                    specification: '',
                    unit: ''
                };
                this.saveVisible = true;
                this.isEdit = false;
            },
            clickNewCategory() {
                this.$router.push('/goodsCategory');
            },
            async clickEditData(row) {
                const date = new Date();
                date.setTime(row.expired_time * 1000);
                this.form = {
                    id: row.id,
                    name: row.name,
                    producer: row.producer,
                    number: row.number,
                    category_id: row.category_id,
                    expired_time: date,
                    specification: row.specification,
                    unit: row.unit,
                    inventory_count: row.inventory_count,
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
            clickOutInput(goods_id) {
                this.record = {
                    goods_id: goods_id,
                    state: 1,
                    remake: '',
                    inventory_count: 1,
                    recordVisible: true

                };
            },
            newData() {
                goodsCreate(this.form).then((res) => {
                        this.saveVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));

                }));
            },
            creteRecord() {
                recordCreate(this.record).then((res) => {
                        this.record.recordVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));

                }));
            },
            editData() {
                goodsEdit(this.form).then((res) => {
                        this.saveVisible = false;
                        // 优化根据返回回填属性?因为懒得写
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));
                }));
            },
            deleteOne() {
                goodsDelete(this.form.id).then((res) => {
                        this.delVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));
                }));
            },
            async loadCategory() {
                getCategory().then(
                    (res) => {
                        this.options = res.data.list;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.msg}`));

                })).finally(() => {
                    this.loading = false;
                });
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
            // 每页多少条切换
            async handleRecordSizeChange(pageSize) {
                this.recordPaginations.pageSize = pageSize;
                await this.loadRecordData();
            },
            // 上下分页
            async handleRecordCurrentChange(page) {
                this.recordPaginations.pageIndex = page;
                await this.loadRecordData();
            },
            formatterTime(row, column, cellValue, index) {
                return FormatterTime(row, column, cellValue, index);
            },
            formatterDate(row, column, cellValue, index) {
                return FormatterDate(row, column, cellValue, index);
            },
            formatterState(row, column, cellValue, index) {
                if (cellValue === 1) {
                    return this.$t('i18n.input');
                } else {
                    return this.$t('i18n.output');
                }
            }
        },
        created() {
            this.loadCategory();
            this.loadData();
            let that = this;
            bus.$on('load_category', () => {
                that.loadCategory();
            });
        },
        computed: {
            isNewDisable() {
                return false;
            },
            isEditDisable() {
                return false;
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




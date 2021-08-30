<template>
    <div>
        <div class="contain">
            <el-form :model="form" inline>
                <el-form-item :label="$t('field.state')">
                    <el-select v-model="form.state" :placeholder="$t('i18n.plsChoose')">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="loadData()">{{$t('i18n.search')}}</el-button>

            </el-form>
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
    </div>


</template>

<script>
    import { getRecord } from '../../api/record';
    import { FormatterTime, FormatterDate } from '../../utils/time';

    export default {
        name: 'records',
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
                form: {
                    state: 0,
                    goods_id: 0
                },
                loading: false,
                tableData: [],
                options: [
                    { label: this.$t('i18n.all'), value: 0 },
                    { label: this.$t('i18n.input'), value: 1 },
                    { label: this.$t('i18n.output'), value: -1 }
                ]
            };
        },
        methods: {
            async loadData() {
                this.loading = true;
                getRecord(this.paginations, this.form).then(
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
            this.loadData();
        },
        computed: {}
    };
</script>

<style scoped>

    .contain {
        background: #fff;
        padding: 10px;
        margin-bottom: 20px;
    }


</style>




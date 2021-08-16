<template>
    <div>
        <div class="contain">
            <el-form inline>
                <el-form-item :label="$t('i18n.imageName')">
                    <el-input v-model="form.imageName"></el-input>
                </el-form-item>
                <el-button type="primary" :disabled="hubSearchDisable" @click="searchData()">{{$t('i18n.hubSearch')}}
                </el-button>

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
                <el-table-column :label="$t('field.ID')"
                                 property="ID"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.Containers')"
                                 property="Containers"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.RepoTags')"
                                 align="center">
                    <template slot-scope="scope">
                        <el-tag
                                type="primary"
                                effect="dark"
                                v-for="(item,index) in scope.row.RepoTags"
                                :key=index
                                disable-transitions>{{item}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('field.Size')"
                                 property="Size"
                                 align="center">

                </el-table-column>
                <el-table-column :label="$t('field.VirtualSize')"
                                 property="VirtualSize"
                                 align="center">

                </el-table-column>
                <el-table-column :label="$t('field.Created')"
                                 property="Created"
                                 :formatter="formatterTime"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('i18n.operate')"
                                 align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="clickDeleteData(scope.row.id)">{{$t('i18n.delete')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        <el-dialog
                :title="$t('i18n.result')"
                :visible.sync="searchDataVisible"
                width="50%"
                center>

            <el-table
                    :data="searchDataResult"
                    border
                    stripe
                    highlight-current-row
                    header-cell-class-name="table-header-class"
                    style="width:100%">
                <el-table-column :label="$t('field.Name')"
                                 property="Name"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.StarCount')"
                                 property="StarCount"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('field.Description')"
                                 property="Description"
                                 align="center">
                </el-table-column>
                <el-table-column :label="$t('i18n.tag')"
                                 align="center">
                    <template slot-scope="scope">

                        <el-tag v-if="scope.row['IsOfficial']" size="small">IsOfficial</el-tag>
                        <el-tag v-else-if="scope.row['IsAutomated']" size="small">IsAutomated</el-tag>
                    </template>

                </el-table-column>
                <el-table-column :label="$t('i18n.operate')"
                                 align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="pullData(scope.row.Name)">{{$t('i18n.pull')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog :title="$t('i18n.processing')"
                   :visible.sync="pullDataVisible"
                   @close="closeEvent"
                   width="50%">
            <div id="processing"></div>

        </el-dialog>
    </div>


</template>

<script>
    import { images, imagesCreate, imagesEdit, imagesDelete, imagesSearch } from '../../api/image';
    import { FormatterTime } from '../../utils/time';

    export default {
        name: 'images',
        data() {
            return {
                loading: false,
                saveVisible: false,
                delVisible: false,
                isEdit: false,
                source: null,
                form: {
                    id: '',
                    serverId: 1,
                    imageName: ''
                },
                tableData: [],
                searchDataVisible: false,
                pullDataVisible: false,
                pullProcessing: [],
                searchDataResult: []
            };
        },
        computed: {
            hubSearchDisable() {
                return this.form.imageName === '';
            }
        },
        methods: {
            async searchData() {
                imagesSearch(this.form.serverId, this.form.imageName).then(
                    (res) => {
                        this.searchDataResult = res.data.list;
                        this.searchDataVisible = true;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.code}`));
                }));
            },
            async loadData() {
                this.loading = true;
                images(this.form.serverId).then(
                    (res) => {
                        this.tableData = res.data.list;
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.code}`));
                })).finally(() => {
                        this.loading = false;
                    }
                )
                ;

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
                imagesCreate(this.form.address, this.form.nick_name, this.form.intro).then((res) => {
                        this.saveVisible = false;
                        this.loadData();
                    }
                ).catch((err => {
                    this.$message.error(this.$t(`code.${err.code}`));
                }));
            },
            editData() {
                imagesEdit(this.form.id, this.form.address, this.form.nick_name, this.form.intro).then((res) => {
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
            pullData(imageName) {
                this.searchDataVisible = false;
                this.pullDataVisible = true;
                const url = `${process.env.VUE_APP_BASE_URL}/api/v1/docker/images/pull?server_id=${this.form.serverId}&image_name=${imageName}`
                this.source = new EventSource(url);
                const that = this;
                this.source.addEventListener('message', function(e) {
                    if (e.data === 'ok') {
                        that.source.close();
                    }
                    let data = JSON.parse(e.data);
                    console.log(data);
                    let html = '';
                    data.forEach(item => {
                        if (item) {
                            if (item.hasOwnProperty('id')) {
                                html += `<p>${item['id']}</p>:`;
                            }
                            if (item.hasOwnProperty('status')) {
                                html += `<p>${item['status']}</p>`;
                            }

                            if (item.hasOwnProperty('progressDetail')) {
                                let progress = item['progressDetail']['progress'];
                                let current = item['progressDetail']['current'];
                                let total = item['progressDetail']['total'];
                                if (progress) {
                                    html += `<p>${progress}</p>`;
                                }
                                if (current) {
                                    html += `<p>${current}</p>`;
                                }
                                if (total) {
                                    html += `<p>${total}</p>`;
                                }
                            }
                        }

                    });

                    document.getElementById('processing').innerHTML = html;

                }, false);

            },
            closeEvent() {
                this.source.close();
            },
            deleteOne() {
                imagesDelete(this.form.id).then((res) => {
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
        },
        beforeDestroy() {
            this.source.close();
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




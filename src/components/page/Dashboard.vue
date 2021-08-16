<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div>
                        <span class="docker-name">架构:</span>
                        <span class="docker-value">{{detail.Architecture}}</span>
                    </div>
                    <div>
                        <span class="docker-name">驱动:</span>
                        <span class="docker-value">{{detail.Driver}}</span>
                    </div>

                    <div>
                        <span class="docker-name">操作系统:</span>
                        <span class="docker-value">{{detail.OSType}}</span>
                    </div>
                    <div>
                        <span class="docker-name">名称:</span>
                        <span class="docker-value">{{detail.Name}}</span>
                    </div>


                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div id="containers"></div>
                        </el-card>
                    </el-col>


                    <el-col :span="3">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <div class="grid-cont-right">
                                    <div>镜像:
                                        <div class="grid-num">{{detail.Images}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import * as echarts from 'echarts';

    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_mobile'),
                detail: {
                    'Architecture': 'x86_64',
                    'BridgeNfIp6tables': true,
                    'BridgeNfIptables': true,
                    'CPUSet': true,
                    'CPUShares': true,
                    'CgroupDriver': 'cgroupfs',
                    'CgroupVersion': '1',
                    'ContainerdCommit': {
                        'Expected': 'd71fcd7d8303cbf684402823e425e9dd2e99285d',
                        'ID': 'd71fcd7d8303cbf684402823e425e9dd2e99285d'
                    },
                    'Containers': 7,
                    'ContainersPaused': 0,
                    'ContainersRunning': 0,
                    'ContainersStopped': 7,
                    'CpuCfsPeriod': true,
                    'CpuCfsQuota': true,
                    'Debug': false,
                    'DefaultRuntime': 'runc',
                    'DockerRootDir': '/var/lib/docker',
                    'Driver': 'overlay2',
                    'DriverStatus': [
                        [
                            'Backing Filesystem',
                            'extfs'
                        ],
                        [
                            'Supports d_type',
                            'true'
                        ],
                        [
                            'Native Overlay Diff',
                            'true'
                        ],
                        [
                            'userxattr',
                            'false'
                        ]
                    ],
                    'ExperimentalBuild': false,
                    'GenericResources': null,
                    'HttpProxy': 'http.docker.internal:3128',
                    'HttpsProxy': 'http.docker.internal:3128',
                    'ID': 'TELG:ZHDT:YGSA:UVYC:IK4K:375Z:42WH:4OL2:UWWG:SE6I:NXM3:2Q4L',
                    'IPv4Forwarding': true,
                    'Images': 12,
                    'IndexServerAddress': 'https://index.docker.io/v1/',
                    'InitBinary': 'docker-init',
                    'InitCommit': {
                        'Expected': 'de40ad0',
                        'ID': 'de40ad0'
                    },
                    'Isolation': '',
                    'KernelMemory': true,
                    'KernelMemoryTCP': true,
                    'KernelVersion': '5.10.25-linuxkit',
                    'Labels': [],
                    'LiveRestoreEnabled': false,
                    'LoggingDriver': 'json-file',
                    'MemTotal': 2084691968,
                    'MemoryLimit': true,
                    'NCPU': 2,
                    'NEventsListener': 3,
                    'NFd': 40,
                    'NGoroutines': 43,
                    'Name': 'docker-desktop',
                    'NoProxy': '',
                    'OSType': 'linux',
                    'OSVersion': '',
                    'OomKillDisable': true,
                    'OperatingSystem': 'Docker Desktop',
                    'PidsLimit': true,
                    'Plugins': {
                        'Authorization': null,
                        'Log': [
                            'awslogs',
                            'fluentd',
                            'gcplogs',
                            'gelf',
                            'journald',
                            'json-file',
                            'local',
                            'logentries',
                            'splunk',
                            'syslog'
                        ],
                        'Network': [
                            'bridge',
                            'host',
                            'ipvlan',
                            'macvlan',
                            'null',
                            'overlay'
                        ],
                        'Volume': [
                            'local'
                        ]
                    },
                    'RegistryConfig': {
                        'AllowNondistributableArtifactsCIDRs': [],
                        'AllowNondistributableArtifactsHostnames': [],
                        'IndexConfigs': {
                            'docker.io': {
                                'Mirrors': [],
                                'Name': 'docker.io',
                                'Official': true,
                                'Secure': true
                            }
                        },
                        'InsecureRegistryCIDRs': [
                            '127.0.0.0/8'
                        ],
                        'Mirrors': []
                    },
                    'RuncCommit': {
                        'Expected': 'b9ee9c6314599f1b4a7f497e1f1f856fe433d3b7',
                        'ID': 'b9ee9c6314599f1b4a7f497e1f1f856fe433d3b7'
                    },
                    'Runtimes': {
                        'io.containerd.runc.v2': {
                            'path': 'runc'
                        },
                        'io.containerd.runtime.v1.linux': {
                            'path': 'runc'
                        },
                        'runc': {
                            'path': 'runc'
                        }
                    },
                    'SecurityOptions': [
                        'name=seccomp,profile=default'
                    ],
                    'ServerVersion': '20.10.7',
                    'SwapLimit': true,
                    'Swarm': {
                        'ControlAvailable': false,
                        'Error': '',
                        'LocalNodeState': 'inactive',
                        'NodeAddr': '',
                        'NodeID': '',
                        'RemoteManagers': null
                    },
                    'SystemTime': '2021-08-11T01:21:42.370251365Z',
                    'Warnings': null
                },

                todoList: [
                    {
                        title: '今天要修复100个bug',
                        status: false
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true
                    }
                ],
                data: [
                    {
                        name: '2018/09/04',
                        value: 1083
                    },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                options: {
                    type: 'bar',
                    title: {
                        text: '最近一周各品类销售图'
                    },
                    xRorate: 25,
                    labels: ['周一', '周二', '周三', '周四', '周五'],
                    datasets: [
                        {
                            label: '家电',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '百货',
                            data: [164, 178, 190, 135, 160]
                        },
                        {
                            label: '食品',
                            data: [144, 198, 150, 235, 120]
                        }
                    ]
                },
                options2: {
                    type: 'line',
                    title: {
                        text: '最近几个月各品类销售趋势图'
                    },
                    labels: ['6月', '7月', '8月', '9月', '10月'],
                    datasets: [
                        {
                            label: '家电',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '百货',
                            data: [164, 178, 150, 135, 160]
                        },
                        {
                            label: '食品',
                            data: [74, 118, 200, 235, 90]
                        }
                    ]
                },
                containerOption: {
                    title: {
                        text: '容器',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 0, name: '正在运行' },
                                { value: 0, name: '暂停' },
                                { value: 7, name: '停止' }
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            };
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initContainers();
            });
        },
        methods: {
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            },
            initContainers() {
                const chartDom = document.getElementById('containers');
                echarts.init(chartDom).setOption(this.containerOption);
            }
        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

    #containers {
        height: 300px;
        width: 300px;
    }

    .docker-name {
        font-size: 20px;
        font-weight: bold;
        color: darkblue;
    }

    .docker-value {
        font-size: 18px;
        font-weight: normal;
    }
</style>

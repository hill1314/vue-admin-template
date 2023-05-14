<template>
    <div class="app-container">
        <h2>医院设置列表</h2>

        <!-- 查询 -->
        <el-form :inline="true" :model="searchObj" class="form-inline">
            <el-form-item label="医院名称">
                <el-input v-model="searchObj.name" placeholder="医院名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchObj.status" placeholder="状态">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList(1)">查询</el-button>
            </el-form-item>
        </el-form>

        <!-- 批量删除 -->
        <el-button type="danger" size="mini" @click="removeRows()">批量删除 </el-button>
        <el-button type="primary" size="mini" @click="toAddPage">添加设置 </el-button>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="contractPerson" label="联系人" />
            <el-table-column prop="contractPhone" label="联系电话" />
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '不可用' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" />

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/hospital/modify/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit"> 修改</el-button>
                    </router-link>
                    <el-button v-if="scope.row.status == 1" type="danger" size="mini" icon="el-icon-delete"
                        @click="removeById(scope.row.id)"> 删除</el-button>
                    <el-button v-if="scope.row.status == 0" type="primary" size="mini" icon="el-icon-delete"
                        @click="revertById(scope.row.id)"> 还原</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination :page-size="pageSize" :current-page="currPage" :total="totalPage" layout="prev, pager, next"
            background @current-change="getList">
        </el-pagination>

    </div>
</template>

<script>
import { getHospSetList, removeHospitalById, removeBatch, revertHospitalById } from '@/api/hospital'
import { MessageBox } from 'element-ui';
// import hospital from '@/api/hospital'

export default ({
    data() {
        return {
            currPage: 1,
            pageSize: 3,
            totalPage: 0,
            searchObj: {
                name: '',
                status: ''
            },
            tableData: [],
            multiSelection: []
        }
    },
    created() {
        //页面渲染前调用
        this.getList();
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
        },

        // 选中事件 
        handleSelectionChange(selection) {
            this.multiSelection = selection;
        },

        //去添加
        toAddPage() {
            this.$router.push({ path: '/hospital/add' })
        },

        //查询列表
        getList(page = 1) {
            this.currPage = page;
            getHospSetList(this.currPage, this.pageSize, this.searchObj)
                .then(response => {
                    this.tableData = response.data.records;
                    this.totalPage = response.data.total;
                    this.currPage = response.data.current;
                })
                .catch(error => {
                    console.error("error===", error);
                })
        },

        //还原
        revertById(id) {
            revertHospitalById(id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '还原成功!'
                    });
                    //刷新页面
                    this.getList();
                })
                .catch(error => {
                    console.error("error===", error);
                })
        },

        // 删除记录
        removeById(id) {
            this.$confirm('是否确认要继续该记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeHospitalById(id)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //刷新页面
                        this.getList();
                    })
                    .catch(error => {
                        console.error("error===", error);
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        // 批量删除
        removeRows() {
            this.$confirm('是否确认要继续选中记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var ids = [];
                console.log("multiSelection===", this.multiSelection)
                for (var i = 0; i < this.multiSelection.lenth; i++) {
                    ids.push(this.multiSelection[i].id);
                }
                console.log(ids);

                if (ids.length == 0) {
                    MessageBox.alert("未选中任何内容");
                    return;
                }

                removeBatch(ids)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //刷新页面
                        this.getList();
                    })
                    .catch(error => {
                        console.error("error===", error);
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
})
</script>

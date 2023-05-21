<template>
    <div class="app-container">
        <h2>需求列表</h2>

        <!-- 查询 -->
        <el-form :inline="true" :model="searchObj" class="form-inline">
            <el-form-item label="需求名称">
                <el-input v-model="searchObj.title" placeholder="需求名称"></el-input>
            </el-form-item>
            <el-form-item label="需求内容">
                <el-input v-model="searchObj.content" placeholder="需求内容"></el-input>
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

        <!-- 批量下线 -->
        <el-button type="danger" size="mini" @click="removeRows()">批量下线 </el-button>
        <el-button type="primary" size="mini" @click="toAddPage">添加需求 </el-button>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="reward" label="赏金" />
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '不可用' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" />

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/dream/modify/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit"> 修改</el-button>
                    </router-link>
                    <el-button v-if="scope.row.status == 1" type="danger" size="mini" icon="el-icon-delete"
                        @click="removeById(scope.row.id)"> 下线</el-button>
                    <el-button v-if="scope.row.status == 0" type="primary" size="mini" icon="el-icon-refresh-right"
                        @click="revertById(scope.row.id)"> 发布</el-button>
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
import { getDreamList, removeBatch, updateDreamStatus } from '@/api/dream'
import { MessageBox } from 'element-ui';
// import dreamApi from '@/api/dream'

export default ({
    data() {
        return {
            currPage: 1,
            pageSize: 3,
            totalPage: 0,
            searchObj: {
                title: '',
                content: '',
                reward: ''
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
            this.$router.push({ path: '/dream/add' })
        },

        //查询列表
        getList(page = 1) {
            this.currPage = page;
            getDreamList(this.currPage, this.pageSize, this.searchObj)
                .then(response => {
                    this.tableData = response.data.records;
                    this.totalPage = response.data.total;
                    this.currPage = response.data.current;
                })
                .catch(error => {
                    console.error("error===", error);
                })
        },

        //发布
        revertById(id) {
            updateDreamStatus(id, 2)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '发布成功!'
                    });
                    //刷新页面
                    this.getList();
                })
                .catch(error => {
                    console.error("error===", error);
                })
        },

        // 下线记录
        removeById(id) {
            this.$confirm('是否确认要继续该记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updateDreamStatus(id, -1)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '下线成功!'
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
                    message: '已取消下线'
                });
            });
        },

        // 批量下线
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
                            message: '下线成功!'
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
                    message: '已取消下线'
                });
            });
        }
    },
})
</script>

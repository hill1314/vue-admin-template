<template>
    <div class="app-container">
        <h2>医院设置列表</h2>

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

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="contractPerson" label="联系人" />
            <el-table-column prop="contractPhone" label="联系电话" />
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '不可用' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" />
        </el-table>

        <!-- 分页 -->
        <el-pagination :page-size="pageSize" :current-page="currPage" :total="totalPage" layout="prev, pager, next"
            background @current-change="getList">
        </el-pagination>

    </div>
</template>

<script>
import { getHospSetList } from '@/api/hospital'
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
            tableData: []
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
        }
    },
})
</script>

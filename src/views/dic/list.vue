<template>
    <div class="app-container">
        <h2>字典列表</h2>

        <!-- 查询 -->
        <el-form :inline="true" :model="searchObj" class="form-inline">
            <el-form-item label="字典名称">
                <el-input v-model="searchObj.name" placeholder="字典名称"></el-input>
            </el-form-item>
            <el-form-item label="字典CODE">
                <el-input v-model="searchObj.name" placeholder="字典CODE"></el-input>
            </el-form-item>
            <el-form-item label="父ID">
                <el-input v-model="searchObj.parentId" placeholder="父ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList(1)">查询</el-button>
            </el-form-item>
        </el-form>

        <!-- 其他按钮 -->
        <el-button type="primary" size="mini" @click="toAddPage">添加设置 </el-button>
        <el-button type="primary" size="mini" @click="importData"> 导入Excel </el-button>


        <!-- 表格 -->
        <el-table :data="tableData" :load="getChildren" :tree-props="{ 'children': children, 'hasChildren': hasChildren }"
            row-key="id" border lazy style="width: 100%">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="parentId" label="父ID" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="code" label="CODE" />
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '有效' : '无效' }}
                </template>
            </el-table-column>
            <el-table-column prop="hasChildren" label="是否有子节点">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '有' : '无' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" />
            <el-table-column prop="updateTime" label="修改日期" />

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/dic/modify/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit"> 修改</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination :page-size="pageSize" :current-page="currPage" :total="totalPage" layout="prev, pager, next"
            background @current-change="getList">
        </el-pagination>

        <!-- 文件上传 -->
        <el-dialog title="导入" :visible.sync="dialogImportVisible" width="600px">
            <el-upload :multiple="false" class="upload-demo" :on-success="onUploadSuccess"
                action="'http://localhost:8020/admin/dic/importData'">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em> </div>
                <div class="el-upload__tip" slot="tip">只能上传xls文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>

    </div>
</template>

<script>
import { getDicList, getByParentId } from '@/api/dic'


export default ({
    data() {
        return {
            dialogImportVisible: false, //弹框
            currPage: 1,
            pageSize: 3,
            totalPage: 0,
            searchObj: {
                name: '',
                code: '',
                parentId: null
            },
            tableData: [
                {
                    hasChildren: false,
                    children: []
                }
            ]
        }
    },
    created() {
        //页面渲染前调用
        this.getList();
    },
    methods: {
        //去添加
        toAddPage() {
            this.$router.push({ path: '/dic/add' })
        },
        //查询列表
        getList(page = 1) {
            this.currPage = page;
            getDicList(this.currPage, this.pageSize, this.searchObj)
                .then(response => {
                    this.tableData = response.data.records;
                    this.totalPage = response.data.total;
                    this.currPage = response.data.current;
                })
                .catch(error => {
                    console.error("error===", error);
                })
        },
        getChildren(tree, treeNode, resolve) {
            getByParentId(tree.id).then(response => {
                resolve(response.data);
            })
        },
        importData() {
            this.dialogImportVisible = true;
        },
        onUploadSuccess() {
            this.dialogImportVisible = false;
            this.getList(1);
        }
    }

})

</script>
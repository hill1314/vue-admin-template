<template>
    <div class="app-container">
        <h2>需求创建</h2>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="需求名称">
                <el-input v-model="form.title" placeholder="不超过64个字符"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="form.content" placeholder="不超过500个字符"></el-input>
            </el-form-item>
            <el-form-item label="赏金">
                <el-input-number v-model="form.reward" :min="1" :max="10000" label="赏金"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="addDreamDetail">添加功能点</el-button>
                <el-button @click="toListPage">取消</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <h2>需求功能点</h2>
        <el-table :data="dreamDetailTable" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="content" label="内容" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" />

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <router-link @click="modifyDetail(scope.row.id, scope.row.content)">
                        <el-button type="primary" size="mini" icon="el-icon-edit"> 修改</el-button>
                    </router-link>
                    <el-button v-if="scope.row.status == 1" type="danger" size="mini" icon="el-icon-delete"
                        @click="removeDetailById(scope.row.id)"> 删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import { createDream, getDreamDetailList, addDetail, modifyDetail, removeDetailById } from '@/api/dream'
// import dreamApi from '@/api/dream'

export default ({
    data() {
        return {
            form: {
                title: '',
                content: '',
                reward: ''
            },
            dreamId: '',
            addDetailParam: {
                dreamId: '',
                content: ''
            },
            dreamDetailTable: []
        }
    },
    mounted() {

    },
    methods: {
        onSubmit() {
            createDream(this.form)
                .then(response => {
                    console.log("创建成功", response);
                    alert(response.data.dream.id);

                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });

                    this.dreamId = response.data.dream.id;
                    this.title = response.data.dream.title;
                    this.content = response.data.dream.content;
                    this.reward = response.data.dream.reward;

                }).catch(error => {
                    console.error("error===", error);
                })
        },

        //查询需求功能点列表
        getDetailList(dreamId) {
            getDreamDetailList(dreamId)
                .then(response => {
                    this.dreamDetailTable = response.data.records;
                })
                .catch(error => {
                    console.error("error===", error);
                })
        },

        //修改明细
        modifyDetail(detailId, content) {
            modifyDetail(detailId, content)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });

                    this.getDetailList(this.dreamId);
                })
                .catch(error => {
                    console.error("error===", error);
                })
        },

        // 删除明细
        removeDetailById(id) {
            this.$confirm('是否确认要继续该记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeDetailById(id)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //刷新页面
                        this.getDetailList(this.dreamId);
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

        //添加功能点
        addDreamDetail() {
            this.$prompt('输入功能点内容', '功能点内容', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {

                this.addDetailParam.dreamId = this.dreamId;
                this.addDetailParam.content = value;

                addDetail(this.addDetailParam)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        //刷新页面
                        this.getDetailList(this.dreamId);
                    })
                    .catch(error => {
                        console.error("error===", error);
                    })


            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });

        },

        //去列表
        toListPage() {
            this.$router.push({ path: '/dream/list' })
        },
    }
})
</script>

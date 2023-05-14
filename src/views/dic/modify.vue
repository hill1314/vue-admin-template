<template>
    <div class="app-container">
        <h2>医院设置修改</h2>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="CODE">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="父ID">
                <el-input v-model="form.parentId"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                </el-select>
            </el-form-item>
        
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存修改</el-button>
                <el-button @click="toListPage">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { updateDic,getDicById } from '@/api/dic'

export default ({
    data() {
        return {
            form: {
                parentId: '',
                code: '',
                name: '',
                status: null,
            }
        }
    },
    mounted() {
        
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id;
            getDicById(id) 
                .then(response => {
                    this.form = response.data;
                }).catch(error => {
                    console.error("error===", error);
                })
        }

    },
    methods: {
        onSubmit() {
            updateDic(this.form)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });

                    //跳转列表
                    this.$router.push({ path: '/dic/list' })

                }).catch(error => {
                    console.error("error===", error);
                })
        },

        //去列表
        toListPage() {
            this.$router.push({ path: '/dic/list' })
        },
    }
})
</script>

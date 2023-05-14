<template>
    <div class="app-container">
        <h2>字典添加</h2>

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

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="toListPage">取消</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import { addDic } from '@/api/dic'

export default({
    data() {
        return {
            form: {
                name: '',
                status: null,
                contractPerson: '',
                contractPhone: ''
            }
        }
    },
    mounted() {

    },

    methods: {
        onSubmit() {
            addDic(this.form)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                
                    //跳转列表
                    this.$router.push({ path: '/dic/list' })

                }).catch(error => {
                    console.error("error===", error);
                })
        },

        //去列表
        toListPage(){
            this.$router.push({ path: '/dic/list' })
        },
    }
})
</script>
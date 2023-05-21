<template>
    <div class="app-container">
        <h2>需求修改</h2>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="需求名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="赏金">
                <el-input-number v-model="form.reward" :min="1" :max="10000" label="赏金"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存修改</el-button>
                <el-button @click="toListPage">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getById, modifyDream } from '@/api/dream'

export default ({
    data() {
        return {
            form: {
                title: '',
                content: '',
                reward: ''
            }
        }
    },
    mounted() {
        
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id;
            getById(id) 
                .then(response => {
                    this.form = response.data;
                }).catch(error => {
                    console.error("error===", error);
                })
        }

    },
    methods: {
        onSubmit() {
            modifyDream(this.form)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });

                    //跳转列表
                    this.$router.push({ path: '/dream/list' })

                }).catch(error => {
                    console.error("error===", error);
                })
        },

        //去列表
        toListPage() {
            this.$router.push({ path: '/dream/list' })
        },
    }
})
</script>

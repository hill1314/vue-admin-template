<template>
    <div class="app-container">
        医院设置添加

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="医院名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="form.contractPerson"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.contractPhone"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addHospital } from '@/api/hospital'

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
            addHospital(this.form)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                
                    //跳转列表
                    this.$router.push({ path: '/hospital/list' })

                }).catch(error => {
                    console.error("error===", error);
                })
        }
    }
})
</script>

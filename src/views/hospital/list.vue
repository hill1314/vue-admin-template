<template>
    <div class="app-container">
        医院设置列表
    </div>

</template>

<script>
import { getHospSetList } from '@/api/hospital'
// import hospital from '@/api/hospital'

export default({
    data() {
        return{
            currPage:1,
            pageSize:1,
            searchObj:{},
            listResult:[]
        }
    },
    created() {
        //页面渲染前调用
        this.getList();
    },
    methods: {
        getList(){
            getHospSetList(this.currPage,this.pageSize,this.searchObj)
            .then(response=>{
                console.info(response);
            })
            .catch(error=>{
                console.error(error);
            })
        }
    },
})
</script>

<!-- author:Hong ZiXian Date:2022/07/10-->
<template>
  <Layout>
    <Title title="员工登記"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">员工登記</el-button>
    <div class = "body">
      <el-table :data="workerList" stripe style="width: 100%"
        :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="id" width="100">
        </el-table-column>
        <el-table-column prop="name" label="名字" width="100">
        </el-table-column>
        <el-table-column prop="sex" label="性別" width="100">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" width="100">
        </el-table-column>
        <el-table-column prop="role" label="员工职位" width="100">
        </el-table-column>
        <el-table-column prop="inductionday" label="入职日期" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="电話" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮件" width="180">
        </el-table-column>
        
        <el-table-column prop="salarycard" label="工资卡">
        </el-table-column>
      </el-table>
        
    </div>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import {getAllWorkers} from "../../network/humansourse/index"
  
  export default {
    name : 'HumansourseView',
    components:{
      Layout,
      Title,
      
    },
    data(){
      return{
        dialogVisible: false,
        workerList:[],
      }
    },
    mounted(){
      getAllWorkers({}).then(_res=>{
        console.log(_res);
        this.workerList = _res.result;
      });
        
    },
    methods:{
        
    }
  }
</script>

<style>
  .body {
    margin: 0 auto;
    margin-top: 10px;
    height: 80vh;
    overflow-y: auto;
    width: 100%;
    background: rgba($color: #fff, $alpha: 0.5);
  }
</style>

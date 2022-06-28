<!-- author:Hong ZiXian Date:2022/06/28-->
<template>
  <Layout>
    <Title title="查看经营历程表"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">查看经营历程表</el-button>
    <div class = "body">
        
      </el-tabs>
    </div>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  
  export default {
    name : 'FinanceView',
    components:{
      Layout,
      Title,
    },
    data(){
      return{
        dialogVisible: false,
      }
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

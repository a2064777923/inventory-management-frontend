<!-- author:Hong ZiXian Date:2022/06/28-->
<template>
  <Layout>
    <Title title="查看经营情况表"></Title>
    <span><strong>请选择一个时间段: </strong></span>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="getDateData()">
    </el-date-picker>
    <el-button type="primary" size="medium" @click="showDetail">查看经营情况表</el-button>
    
    <div class = "body">
      <label>收入</label>
<el-table :data="incomeList" stripe style="width: 100%"
        :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="id" width="100">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
        </el-table-column>
        <el-table-column prop="originIncome" label="原金额" width="100">
        </el-table-column>
        <el-table-column prop="returnMoney" label="折讓额" width="100">
        </el-table-column>
        <el-table-column prop="realIncome" label="折讓后金额" width="100">
        </el-table-column>
        <el-table-column prop="time" label="时间" width="100">
        </el-table-column>

      </el-table>
      <label>支出</label>
      
      <el-table :data="expendList" stripe style="width: 100%"
              :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
              <el-table-column prop="id" label="id" width="100">
              </el-table-column>
              <el-table-column prop="type" label="类型" width="100">
              </el-table-column>
              <el-table-column prop="totalExpend" label="总金额" width="100">
              </el-table-column>
              <el-table-column prop="time" label="时间" width="100">
              </el-table-column>
      
            </el-table>
    </div>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import ExportJsonExcel from "js-export-excel";
  import { formatDate } from "@/common/utils";
  import{getAllIncomes,getAllExpend} from "../../network/financial"
  
  export default {
    name : 'BusinessSituation',
    components:{
      Layout,
      Title,
    },
    data(){
      return{
        date: '',
        dialogVisible: false,
        incomeList:[],
        expendList:[],
        beginDateStr:'',
        endDateStr:''
      }
    },
    computed: {
      beginDate: function(){
        return this.date === '' ? '' : formatDate(this.date[0])
      },
      endDate: function() {
        return this.date === '' ? '' : formatDate(this.date[1])
      }
    },
    mounted(){
      
    },
    methods:{
      getDateData(){
        this.beginDateStr = this.beginDate
        this.endDateStr = this.endDate
      },
      showDetail(){
        if(this.beginDateStr === null){
          this.$message.error('請选择时间段!')
        }else{
          const config = {
            params: {
              beginDateStr: this.beginDateStr,
              endDateStr: this.endDateStr
            }
          }
          getAllIncomes(config).then(_res => {
            console.log(_res)
            this.incomeList = _res.result
          })
          getAllExpend(config).then(_res => {
            console.log(_res)
            this.expendList = _res.result
          })
          
        }
        
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

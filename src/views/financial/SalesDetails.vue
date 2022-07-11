<!-- author:Hong ZiXian Date:2022/06/28-->
<template>
  <Layout>
    <Title title="查看销售明细表"></Title>
    <el-button type="primary" size="medium" @click="choseDialogVisible = true">查看销售明细表</el-button>
    <el-button @click="exportAsExcel">导出Excel</el-button>
    <el-dialog
    title="选择查找条件"
    :visible.sync="choseDialogVisible"
    width="60%"
    :before-close="handleClose">
    <div style="width : 90% ; margin: 0 auto">
        <el-form :model="searchInfo" label-width="100px" ref="searchInfo">
          <span><strong>请选择一个时间段: </strong></span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getDateData()">
          </el-date-picker>
          <el-form-item label="商品名: " >
            <el-checkbox-group v-model ="searchInfo.productName">
              <el-checkbox v-for="item in productList" :key = "item.id" :label = "item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
            
          </el-form-item>
          <el-form-item label="客戶: " >
            <el-checkbox-group v-model ="searchInfo.customer">
              <el-checkbox v-for="item in customerList" :key = "item.id" :label = "item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="业务员: " >
            <el-checkbox-group v-model ="searchInfo.salesmen">
              <el-checkbox v-for="item in salesmenList" :key = "item.id" :label = "item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('searchInfo')">立即查找</el-button>
    </span>
    </el-dialog>

    
    <div class = "body">
        <el-table
          :data="salesDetailContent"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          class="mt15">
          <el-table-column
            prop="state"
            label="类型"
            width="100"
            :filters="[{ text: '卖出', value: 'sales' }, { text: '退货', value: 'return' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === 'sales' ? 'primary' : 'success'"
                disable-transitions>{{transform(scope.row.state)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="id"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="type"
            label="型号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="数量"
            width="150">
          </el-table-column>
          <el-table-column
            prop="unitPrice"
            label="单价(元)"
            width="150">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="总价(元)"
            width="150">
          </el-table-column>
          <el-table-column
            label="时间"
            width="250">
            <template slot-scope="scope">
              {{formatDate(scope.row.createTime)}}
            </template>
            
          </el-table-column>
        </el-table>
    </div>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import ExportJsonExcel from "js-export-excel"
  import { formatDate } from "@/common/utils";
  import {findAllProduct} from "../../network/product/index"
  import {getAllCustomer} from "../../network/sale/index"
  import {getAllSalesmens,getAllSalesDetails} from "../../network/financial/index"
  
  export default {
    name : 'SalesDetails',
    components:{
      Layout,
      Title,
    },
    data(){
      return{
        date: '',
        choseDialogVisible: false,
        searchInfo:{
          beginDateStr:'',
          endDateStr:'',
          productName:[],
          customer:[],
          salesmen:[],
        },
        productList:[],
        customerList:[],
        salesmenList:[],
        salesDetailContent:[]
      }
    },
    mounted(){
      //初始化
      findAllProduct({}).then(_res =>{
        let res = _res.result;
        res.forEach(x=>this.productList.push({"name":x.name,"id":x.id}));
      });
      getAllCustomer({ params : { type: 'SELLER' } }).then(_res =>{
        let res = _res.result;
        res.forEach(x=>this.customerList.push({"name":x.name,"id":x.id}));
      })
      getAllSalesmens({ }).then(_res =>{
        let res = _res.result;
        res.forEach(x=>this.salesmenList.push({"name":x.name,"id":x.id}));
      })
      console.log(this.productList)

      
    },
    computed:{
      beginDate: function(){
        return this.date === '' ? '' : formatDate(this.date[0])
      },
      endDate: function() {
        return this.date === '' ? '' : formatDate(this.date[1])
      }
    },
    methods:{
      getDateData(){
        this.searchInfo.beginDateStr = this.beginDate
        this.searchInfo.endDateStr = this.endDate
        console.log(this.searchInfo)
      },
      getData() {
        const config = {
          params: this.searchInfo
        }
      },
      submitForm(formName){
        if(this.searchInfo.beginDateStr === ''){
          this.searchInfo.beginDateStr = "1999-12-31 00:00:00";
        }
        if(this.searchInfo.endDateStr === ''){
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth()+1;
          let dd = new Date().getDate();
          this.searchInfo.endDateStr = yy+'-'+mm+'-'+dd +" 00:00:00";
        }
        if(this.searchInfo.productName.length === 0){
          this.productList.forEach(x=>this.searchInfo.productName.push(x.name));
        }
        if(this.searchInfo.customer.length === 0){
          this.customerList.forEach(x=>this.searchInfo.customer.push(x.id));
        }
        if(this.searchInfo.salesmen.length === 0){
          this.salesmenList.forEach(x=>this.searchInfo.salesmen.push(x.name));
        }
        getAllSalesDetails(this.searchInfo).then(_res => {
          console.log(_res)
          if(_res.msg == "Success"){
            this.$message.success('查找成功!')
            this.resetForm()
            this.salesDetailContent = _res.result
            this.choseDialogVisible = false
            
          }
        })
        
        console.log(this.searchInfo);
      },
      filterTag(value, row) {
        return row.state === value;
      },
      async exportAsExcel() {
         let excelFile = {}; //excel文件
         let sheet = [];//數據表
         console.log("el:",this.salesDetailContent);
         if(this.salesDetailContent.length > 0){
           for(let i in this.salesDetailContent){
             let salesContent = this.salesDetailContent[i];
             let data = {
               "id":salesContent.id,
               "产品名称":salesContent.name,
               "型号":salesContent.type,
               "数量":salesContent.quantity,
               "单价(元)":salesContent.unitPrice,
               "总价(元)":salesContent.totalPrice,
               "时间":salesContent.createTime,
             };
             sheet.push(data);
           }
           excelFile.fileName = "銷售詳情XLS";
           excelFile.datas = [{
             //excel文件的数据源
               sheetData: sheet,
             //excel文件sheet的表名
               sheetName: "sheet1",
             //excel文件表头名
               sheetHeader: ["id","产品名称","型号","数量","单价(元)","总价(元)","时间"],
             //excel文件列名
               sheetFilter: ["id","产品名称","型号","数量","单价(元)","总价(元)","时间"],
             },
           ];
           //创建ExportJsonExcel实例对象
           let toExcel = new ExportJsonExcel(excelFile);
           //调用保存方法
           toExcel.saveExcel();
         }else{
           this.$message.error("無銷售詳情記錄!");
         }
         //TODO 导出Excel
       },
      handleClose(done){
        this.$confirm('确認关闭?').then(_=>{
          this.resetForm()
          done();
          this.choseDialogVisible=false;
        })
        .catch(_ => {});
        
      },
      resetForm(){
        this.searchInfo={
          beginDateStr:'',
          endDateStr:'',
          productName:[],
          customer:[],
          salesmen:[],
        },
        this.choseDialogVisible=false
      },
      transform(type) {
        return type === 'sales' ? '卖出' : '退货'
      },
     formatDate
    }
  };
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

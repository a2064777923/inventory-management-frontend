<!-- author:Hong ZiXian Date:2022/07/09-->
<template>
  <Layout>
    <Title title="查看经营历程表"></Title>
    <el-button type="primary" size="medium" @click="choseDialogVisible = true">查看经营历程表</el-button>
    <el-button @click="exportAsExcel">导出Excel</el-button>
    <el-dialog title="选择查找条件" :visible.sync="choseDialogVisible" width="60%" :before-close="handleClose">
      <div style="width : 90% ; margin: 0 auto">
        <el-form :model="searchInfo" label-width="100px" ref="searchInfo">
          <span><strong>请选择一个时间段: </strong></span>
          <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" @change="getDateData()">
          </el-date-picker>
          <el-form-item label="单据类型: ">
            <el-checkbox-group v-model="searchInfo.sheetType">
              <el-checkbox v-for="item in sheetTypeList" :key="item.id" :label="item.type">{{item.type}}</el-checkbox>
            </el-checkbox-group>

          </el-form-item>
          <el-form-item label="客戶: ">
            <el-checkbox-group v-model="searchInfo.customer">
              <el-checkbox v-for="item in customerList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="业务员: ">
            <el-checkbox-group v-model="searchInfo.salesmen">
              <el-checkbox v-for="item in salesmenList" :key="item.id" :label="item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('searchInfo')">立即查找</el-button>
      </span>
    </el-dialog>


    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label = "銷售类单据" name = "sales_sheet">
          <div v-if="salesSheet.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="salesSheet"></sale-list>
            <sale-return-list :list="salesReturnSheet"></sale-return-list>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进货类单据" name = "purchase_sheet">
          <div v-if="purchaseSheet.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="purchaseSheet"></purchase-list>
            <purchase-return-list :list="purchaseReturnSheet"></purchase-return-list>
            </div>
        </el-tab-pane>
        <el-tab-pane label = "財務类单据" name = "financial_sheet">
          <div v-if="transferSheet.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <transfer-list :list="transferSheet"></transfer-list>
            
          </div>
        </el-tab-pane>
        
      </el-tabs>


    </div>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import ExportJsonExcel from "js-export-excel"
  import {
    formatDate
  } from "@/common/utils";
  import {
    getAllCustomer
  } from "../../network/sale/index"
  import {
    getAllSalesmens,getPurchaseSheet,getPurchaseReturnSheet,getSaleSheet,getSalesReturnSheet,getAllCollection,getAllPayment
  } from "../../network/financial/index"
  import PurchaseList from '../purchase/components/PurchaseList'
  import PurchaseReturnList from '../purchase/components/PurchaseReturnList'
  import SaleList from '../sale/components/SaleList'
  import SaleReturnList from '../sale/components/SaleReturnList'
  import TransferList from "./components/TransferList"

  export default {
    name: 'BusinessHistory',
    components: {
      Layout,
      Title,
      PurchaseList,
      PurchaseReturnList,
      SaleList,
      SaleReturnList,
      TransferList
    },
    data() {
      return {
        date:'',
        activeName:'sales_sheet',
        choseDialogVisible: false,
        searchInfo: {
          beginDateStr: '',
          endDateStr: '',
          sheetType: [],
          customer: [],
          salesmen: [],
        },
        sheetTypeList: [{
          type: "销售出货单",
          id: 1
        }, {
          type: "销售退货单",
          id: 2
        }, {
          type: "进货单",
          id: 3
        }, {
          type: "进货退货单",
          id: 4
        }, {
          type: "付款单",
          id: 5
        }, {
          type: "收款单",
          id: 6
        }, {
          type: "工资单",
          id: 7
        }],
        customerList: [],
        salesmenList: [],
        financialSheet: [],
        salesSheet:[],
        purchaseSheet:[],
        purchaseReturnSheet:[],
        salesReturnSheet:[],
        transferSheet:[]
      }
    },
    mounted() {
      //初始化
      getAllCustomer({
        params: {
          type: 'SELLER'
        }
      }).then(_res => {
        let res = _res.result;
        res.forEach(x => this.customerList.push({
          "name": x.name,
          "id": x.id
        }));
      })
      getAllCustomer({
        params: {
          type: 'SUPPLIER'
        }
      }).then(_res => {
        let res = _res.result;
        res.forEach(x => this.customerList.push({
          "name": x.name,
          "id": x.id
        }));
      })
      getAllSalesmens({}).then(_res => {
        let res = _res.result;
        res.forEach(x => this.salesmenList.push({
          "name": x.name,
          "id": x.id
        }));
      })

    },
    computed: {
      beginDate: function() {
        return this.date === '' ? '' : formatDate(this.date[0])
      },
      endDate: function() {
        return this.date === '' ? '' : formatDate(this.date[1])
      }
    },
    methods: {
      getDateData() {
        this.searchInfo.beginDateStr = this.beginDate
        this.searchInfo.endDateStr = this.endDate
        console.log(this.searchInfo)
      },
      getData() {
        const config = {
          params: this.searchInfo
        }
      },
      submitForm(formName) {
        if (this.searchInfo.beginDateStr === '') {
          this.searchInfo.beginDateStr = "1999-12-31 00:00:00";
        }
        if (this.searchInfo.endDateStr === '') {
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth() + 1;
          let dd = new Date().getDate();
          this.searchInfo.endDateStr = yy + '-' + mm + '-' + dd + " 00:00:00";
        }
        if (this.searchInfo.sheetType.length === 0) {
          this.sheetTypeList.forEach(x => this.searchInfo.sheetType.push(x.type));
        }
        if (this.searchInfo.customer.length === 0) {
          this.customerList.forEach(x => this.searchInfo.customer.push(x.id));
        }
        if (this.searchInfo.salesmen.length === 0) {
          this.salesmenList.forEach(x => this.searchInfo.salesmen.push(x.name));
        }
        for(let i in this.searchInfo.sheetType){
          console.log(i);
          if(this.searchInfo.sheetType[i]==="进货单"){
            getPurchaseSheet(this.searchInfo).then(_res=>{
              console.log(_res)
              this.purchaseSheet = _res.result;
            })
          }
          if(this.searchInfo.sheetType[i] === "进货退货单"){
            getPurchaseReturnSheet(this.searchInfo).then(_res=>{
              console.log(_res)
              this.purchaseReturnSheet = _res.result;
            })
          }
          if(this.searchInfo.sheetType[i] === "销售出货单"){
            getSaleSheet(this.searchInfo).then(_res=>{
              console.log(_res)
              this.salesSheet = _res.result;
            })
          }
          if(this.searchInfo.sheetType[i] === "销售退货单"){
            getSalesReturnSheet(this.searchInfo).then(_res=>{
              console.log(_res)
              this.salesReturnSheet = _res.result;
            })
          }
          if(this.searchInfo.sheetType[i] === "收款单"){
            getAllCollection({}).then(_res=> {
              console.log(_res.result);
              this.transferSheet= _res.result
            })
          }
          if(this.searchInfo.sheetType[i] === "付款单"){
            getAllPayment({}).then(_res=> {
              console.log(_res.result);
              let res = _res.result
              res.forEach(x => {this.transferSheet.push(x)})
              })
          }
          this.$message.success('查找成功!')
          //this.resetForm()
          this.choseDialogVisible = false
        }

        console.log(this.searchInfo);
      },
      filterTag(value, row) {
        return row.state === value;
      },
      async exportAsExcel() {
        let excelFile = {}; //excel文件
        let sheet = []; //數據表
        console.log("el:", this.salesDetailContent);
        if (this.salesDetailContent.length > 0) {
          for (let i in this.salesDetailContent) {
            let salesContent = this.salesDetailContent[i];
            let data = {
              "id": salesContent.id,
              "产品名称": salesContent.name,
              "型号": salesContent.type,
              "数量": salesContent.quantity,
              "单价(元)": salesContent.unitPrice,
              "总价(元)": salesContent.totalPrice,
              "时间": salesContent.createTime,
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
            sheetHeader: ["id", "产品名称", "型号", "数量", "单价(元)", "总价(元)", "时间"],
            //excel文件列名
            sheetFilter: ["id", "产品名称", "型号", "数量", "单价(元)", "总价(元)", "时间"],
          }, ];
          //创建ExportJsonExcel实例对象
          let toExcel = new ExportJsonExcel(excelFile);
          //调用保存方法
          toExcel.saveExcel();
        } else {
          this.$message.error("無銷售詳情記錄!");
        }
        //TODO 导出Excel
      },
      handleClose(done) {
        this.$confirm('确認关闭?').then(_ => {
            this.resetForm()
            done();
            this.choseDialogVisible = false;
          })
          .catch(_ => {});

      },
      resetForm() {
        this.searchInfo = {
            beginDateStr: '',
            endDateStr: '',
            sheetType: [],
            customer: [],
            salesmen: [],
          },
          this.choseDialogVisible = false
      },
      transform(type) {
        return type === 'sales' ? '卖出' : '退货'
      },
      formatDate
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

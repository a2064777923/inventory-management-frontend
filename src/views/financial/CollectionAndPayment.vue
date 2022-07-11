<!-- author:Hong ZiXian Date:2022/06/28-->
<template>
  <Layout>
    <Title title="制定收付款单"></Title>
    <el-button type="primary" size="medium" @click="collectionDialogVisible = true ;paymentForm.transferType = 'get'" >制定收款单</el-button>
        <el-button type="primary" size="medium" @click="collectionDialogVisible = true ;paymentForm.transferType = 'pay'" >制定付款单</el-button>
    <div class = "body">
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane label = "待总经理审批" name = "PENDING_MANAGER">
            <div v-if="pendingManagerList.length === 0">
              <el-empty description="暂无数据"></el-empty>
            </div>
            <div v-else>
              <transfer-list :list="pendingManagerList" :type="1" @refresh="getTransfer()"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批完成" name = "SUCCESS">
            <div v-if="successList.length === 0">
              <el-empty description="暂无数据"></el-empty>
            </div>
            <div v-else>
              <transfer-list :list="successList" :type="2"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label = "审批失败" name = "FAILURE">
            <div v-if="failureList.length === 0">
              <el-empty description="暂无数据"></el-empty>
            </div>
            <div v-else>
              <transfer-list :list="failureList" :type="3"/>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
    <el-dialog
    title="创建收付款单"
    :visible.sync="collectionDialogVisible"
    width="40%"
    :before-close="handleClose">
    <div style="width : 90% ; margin: 0 auto">
      <el-form :model="paymentForm" label-width="100px" ref="paymentForm" :rules="rules">
        <el-form-item label="客戶: " prop="customer" >
          <el-select v-model="paymentForm.customer" placeholder="請选择客戶">
            <el-option
            v-for="item in customers"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="(item,index) in paymentForm.transferSheetContent" :key="index" :label="'轉賬項' + index">
          <div>
            <el-select v-model = "item.bankNo" placeholder = "請选择賬戶号" style= "width: 50%; margin-right: 5%">
              <el-option
              v-for="item1 in accountList"
              :key="item1.id"
              :label="item1.bankNo"
              :value="item1.id">
              </el-option>
            </el-select>
            <el-input v-model = "item.amount" style="width:50% ; margin-right:5%" placeholder="請輸入轉賬金额"></el-input>
          </div>
          <div style="margin-top : 10px" >
            <el-input v-model = "item.remaark" style= "width:70%; margin-right:10%" placeholder="請填寫備注"></el-input>
            <el-button  type="text" size="small" @click="addAccount" v-if= "index === paymentForm.transferSheetContent.length - 1">添加</el-button>
            <el-button type = "text" size="small" @click.prevent="removeAccount(item)" v-if="index !== 0">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="备注: ">
          <el-input type="textarea" v-model="paymentForm.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('paymentForm')">立即创建</el-button>
    </span>
    </el-dialog>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import TransferList from "./components/TransferList"
  import {getAllCustomer} from '../../network/purchase'
  import {getAllCollection,getAllPayment, getAllBank, createCollectionSheet,createPaymentSheet} from '../../network/financial'
  
  
  export default {
    name : 'CollectionAndPayment',
    components:{
      Layout,
      Title,
      TransferList
    },
    data(){
      return{
        activeName:'PENDING_MANAGER',
        collectionDialogVisible: false,
        transfermentList:[],
        pendingManagerList:[],
        successList:[],
        failureList:[],
        paymentForm:{
          transferType:'',
          transferSheetContent:[
            {
              id:'',
              bankNo:'',
              amount:'',
              remark:''
            }
          ]
        },
        customers:[],
        rules:{
          customer:[
            {
            required: true, message: '請选择一个客戶',trigger:'change' }
          ],
         },
        accountList:[]
      }
        
    },
      
    mounted(){
      this.getTransfer()
      getAllCustomer({params:{type:'SELLER'}}).then(_res => {
        this.customers = _res.result;
      })
      getAllCustomer({params:{type:'SUPPLIER'}}).then(_res=>{
        let res = _res.result
        res.forEach(x=>{this.customers.push(x)})
      })
      getAllBank({}).then(_res=> {this.accountList = _res.result;})
      
    },
    methods:{
      async getTransfer(){
        await getAllCollection({}).then(_res=> {
          console.log(_res.result);
          this.transfermentList = _res.result
        })
        getAllPayment({}).then(_res=>{
          let res = _res.result
         res.forEach(x => {this.transfermentList.push(x          )})
         this.pendingManagerList = this.transfermentList.filter(item => item.state === '待总经理审批')
         this.successList = this.transfermentList.filter(item => item.state === '审批完成')
         this.failureList = this.transfermentList.filter(item => item.state === '审批失败')
        })
       
      },
      
      handleClose(done){
        this.$confirm('确認关闭?').then(_=>{
          this.resetForm()
          done();
          this.collectionDialogVisible=false;
        })
        .catch(_ => {});
        
      },
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.paymentForm.id = null
            this.paymentForm.operator = sessionStorage.getItem("name")
            this.paymentForm.totalAmount = null
            this.paymentForm.transferSheetContent.forEach((item) => {
              item.id = null
              item.transferSheetId = null
              item.quantity
              var numReg = /^[0-9]*$/
              var numRe = new RegExp(numReg)
              
              if (!numRe.test(item.amount)) {
                this.$message.error('請輸入正确的金额!')
              }
            })
            if(this.paymentForm.transferType === "get"){
              createCollectionSheet(this.paymentForm).then(_res =>{
                console.log(_res)
                if(_res.msg === 'Success'){
                  this.$message.success('创建成功!')
                  this.resetForm()
                  this.dialogVisible = false
                  this.getTransfer()
                }
              })
            }else if(this.paymentForm.transferType == "pay"){
              createPaymentSheet(this.paymentForm).then(_res=>{
                console.log(_res)
                if(_res.msg === "Success"){
                  this.$message.success('创建成功!')
                  this.resetForm()
                  this.dialogVisible =false
                  this.getTransfer()
                }
              })
              
            }
          }else{
            this.$message.error('Error!');
          }
        });
        
      },
      
      resetForm(){
        this.paymentForm = {
          transferSheetContent:[
            {
              id:'',
              bankNo:'',
              amount:'',
              remark:''
            }
          ]
        }
        this.collectionDialogVisible=false
      },
      addAccount(){
        this.paymentForm.transferSheetContent.push({});
      },
      removeProduct(item) {
        var index = this.paymentForm.transferSheetContent.indexOf(item)
        if(index !== -1){
          this.paymentForm.transferSheetContent.splice(index,1)
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

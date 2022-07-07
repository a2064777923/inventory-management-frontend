<!-- author:Hong ZiXian Date:2022/07/06-->
<template>
  <Layout>
    <Title title="制定工资单"></Title>
    <el-button type="primary" size="medium" @click="salaryDialogVisible = true">制定工资单</el-button>
    <div class = "body">
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane label = "待总经理审批" name = "PENDING_MANAGER">
            <div v-if="pendingManagerList.length === 0">
              <el-empty description="暂无数据"></el-empty>
            </div>
            <div v-else>
              <salary-list :list="pendingManagerList" :type="1" @refresh="getSalarys()"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批完成" name = "SUCCESS">
            <div v-if="successList.length === 0">
              <el-empty description="暂无数据"></el-empty>
            </div>
            <div v-else>
              <salary-list :list="successList" :type="2"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label = "审批失败" name = "FAILURE">
            <div v-if="failureList.length === 0">
              <el-empty description="暂无数据"></el-empty>
            </div>
            <div v-else>
              <salary-list :list="failureList" :type="3"/>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
    <el-dialog
    title="创建工资单"
    :visible.sync="salaryDialogVisible"
    width="40%"
    :before-close="handleClose">
    <div style="width : 90% ; margin: 0 auto">
      <el-form :model="salaryForm" label-width="100px" ref="salaryForm">
        <el-form-item v-for="(item,index) in salaryForm.staffSheetContent" :key="index" :label="'员工' + index" >
          <div>
            <el-select v-model = "item.staff_id" placeholder = "請选择要發工资的员工" @change="selectStaff(index,staffInfoList.filter(item1=>item1.staff_id === item.staff_id));"style= "width: 80%; margin-right: 5%">
              <el-option
              v-for="(item1,index1) in staffInfoList"
              :key="index1"
              :label="item1.name"
              :value="item1.staff_id">
               <el-popover
                 placement="right"
                 width="800"
                 trigger="hover">
                 <el-table :data="[staffInfoList[index1]]">
                   <el-table-column width="50" property="staff_id" label="id"></el-table-column>
                   <el-table-column width="100" property="name" label="名字"></el-table-column>
                   <el-table-column width="100" property="wage" label="工资"></el-table-column>
                   <el-table-column width="150" property="personalIncomeTax" label="个人所得稅"></el-table-column>
                   <el-table-column width="150" property="unemploymentInsurance" label="失业保险"></el-table-column>
                   <el-table-column width="150" property="housingFund" label="住房公积金"></el-table-column>
                    <el-table-column width="150" property="finalSalary" label="实發工资"></el-table-column>
                    <el-table-column width="200" property="bankNo" label="銀行賬戶"></el-table-column>
                 </el-table>
                 <span slot="reference">{{ item1.name}}</span>
               </el-popover>
              </el-option>
            </el-select>
            <el-input v-model = "item.remark" style="width:80% ; margin-right:5%" placeholder="备注"></el-input>
          </div>
          <div style="margin-top : 10px" >
            <el-button  type="text" size="small" @click="addStaff" v-if= "index === salaryForm.staffSheetContent.length - 1">添加</el-button>
            <el-button type = "text" size="small" @click.prevent="removeStaff(item)" v-if="index !== 0">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="备注: ">
          <el-input type="textarea" v-model="salaryForm.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('salaryForm')">立即创建</el-button>
    </span>
    </el-dialog>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import SalaryList from"./components/SalaryList"

  import {getAllSalarySheet,createSalarySheet,getAllStaffInfo} from '../../network/financial'
  
  export default {
    name : 'FinanceView',
    components:{
      Layout,
      Title,
      SalaryList
    },
    data(){
      return{
        activeName:'PENDING_MANAGER',
        salaryDialogVisible: false,
        allSalarySheetList:[],
        pendingManagerList:[],
        successList:[],
        failureList:[],
        salaryForm:{
          staffSheetContent:[
            {
              staff_id:'',
              name:'null',
              bankNo:'',
              grossSalary:'',
              personalIncomeTax:'',
              unemploymentInsurance:'',
              housingFund:'',
              finalSalary:'',
              remark:''
            }
          ],
          totalAmount:''
        },
        staffInfoList:[],
      }
        
    },
      
    mounted(){
      this.getSalarys()
      getAllStaffInfo({}).then(_res => {

        this.staffInfoList = _res.result;
      })
      
    },
    methods:{
      async getSalarys(){
        await getAllSalarySheet({}).then(_res=> {
          console.log(_res.result);
          this.allSalarySheetList = _res.result
        })
         this.pendingManagerList = this.allSalarySheetList.filter(item => item.state === '待总经理审批')
         this.successList = this.allSalarySheetList.filter(item => item.state === '审批完成')
         this.failureList = this.allSalarySheetList.filter(item => item.state === '审批失败')
        },
      
      handleClose(done){
        this.$confirm('确認关闭?').then(_=>{
          this.resetForm()
          done();
          this.salaryDialogVisible=false;
        })
        .catch(_ => {});
        
      },
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.salaryForm.id = null
            this.salaryForm.operator = sessionStorage.getItem("name")
            this.salaryForm.totalAmount = null
            this.salaryForm.staffSheetContent.forEach((item) => {
              item.id = null
              item.salarySheetId = null
            })
           createSalarySheet(this.salaryForm).then(_res =>{
                console.log(_res)
                if(_res.msg === 'Success'){
                  this.$message.success('创建成功!')
                  this.resetForm()
                  this.salarydialogVisible = false
                  this.getSalarys()
                }
              })
              
          }else{
            this.$message.error('Error!');
          }
        });
        
      },
      
      resetForm(){
        this.salaryForm = {
          staffSheetContent:[
            {
              staff_id:'',
              name:'null',
              bankNo:'',
              grossSalary:'',
              personalIncomeTax:'',
              unemploymentInsurance:'',
              housingFund:'',
              finalSalary:'',
              remark:''
            }
          ],
          totalAmount:''
        }
        this.salaryDialogVisible=false
      },
      selectStaff(index,content) {
        console.log(content)
        this.salaryForm.staffSheetContent[index] = content[0]
        this.salaryForm.staffSheetContent[index].grossSalary = content[0].wage;
        getAllStaffInfo({}).then(_res => {
          this.staffInfoList = _res.result;
        })
      },
      addStaff(){
        this.salaryForm.staffSheetContent.push({
              staff_id:'',
              name:'null',
              bankNo:'',
              grossSalary:'',
              personalIncomeTax:'',
              unemploymentInsurance:'',
              housingFund:'',
              finalSalary:'',
              remark:''
            });
      },
      removeStaff(item) {
        var index = this.salaryForm.staffSheetContent.indexOf(item)
        if(index !== -1){
          this.salaryForm.staffSheetContent.splice(index,1)
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

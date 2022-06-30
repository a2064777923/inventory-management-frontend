<!-- author:Hong ZiXian Date:2022/06/29-->
<template>
  <Layout>
    <Title title="账户管理"></Title>
    <el-button type="primary" size="medium" @click="addBank()">新增账户</el-button>
    <div style = "margin-top : 10px" class = "body">
      <el-table
      :data="bankList"
      stripe style = "width : 100%"
      :header-cell-style="{'text-align' : 'center'}"
      :cell-style="{'text-align':'center'}">
      <el-table-column
      prop = 'id'
      label="id"
      width="80">
      </el-table-column>
      <el-table-column
      prop = 'name'
      label="名称"
      width="250">
      </el-table-column>
      <el-table-column
      prop = 'bankNo'
      label="账戶号"
      width="250">
      </el-table-column>
      <el-table-column
      prop = 'amount'
      label="金额"
      width="300">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editBank(scope.row.id)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteBank(scope.row.id)"
            type="text"
            size="small">
            刪除
          </el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <el-dialog
     title="新增账户"
     :visible.sync="addDialogVisible"
     width="30%"
     @close="close()">
     <el-form :model ="addForm" :label-width="'100px'" size ="mini">
       <el-form-item label ="名 称">
         <el-input v-model="addForm.name" placeholder="請輸入賬戶名称"></el-input>
       </el-form-item>
       <el-form-item label = "賬 戶 號">
         <el-input v-model="addForm.bankNo" placeholder="請輸入賬戶號">
         </el-input>
       </el-form-item>
       <el-form-item label = "金 额">
         <el-col :span="40">
           <el-input v-model = "addForm.amount" placeholder="請輸入賬戶金额" type="number"></el-input>
         </el-col>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="handleAdd(false)">取 消</el-button>
       <el-button type = "primary" @click = "handleAdd(true)">确 定</el-button>
     </div>
     </el-dialog>
     <el-dialog
      title="修改账户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model ="editForm" :label-width="'100px'" size ="mini">
        <el-form-item label ="名 称">
          <el-input v-model="editForm.name" placeholder="請輸入賬戶名称"></el-input>
        </el-form-item>
        <el-form-item label = "賬 戶 號">
          <el-input v-model="editForm.bankNo" placeholder="請輸入賬戶號">
          </el-input>
        </el-form-item>
        <el-form-item label = "金 额">
          <el-col :span="40">
            <el-input v-model = "editForm.amount" placeholder="請輸入賬戶金额" type="number"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEdit(false)">取 消</el-button>
        <el-button type = "primary" @click = "handleEdit(true)">确 定</el-button>
      </div>
    </el-dialog>
  </Layout>
</template>


<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import { getAllBank,
           createBankAccount,
           updateBank,
           deleteBankAccount } from "../../network/financial"
  
  export default {
    name : 'FinanceView',
    components:{
      Layout,
      Title,
    },
    data(){
      return{
        bankList:[],
        addDialogVisible: false,
        addForm:{
          name: '',
          bankNo : '',
          amount : '',
        },
        editDialogVisible:false,
        editForm:{},
      }
    },
    async mounted(){
      await getAllBank().then(_res =>{
        this.bankList = this.bankList. concat(_res.result)
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '获取账户列表失败!' + err
        })
      })
    },
    methods :{
      getAllBanks(){
        getAllBank().then(_res =>{
          this.bankList = [];
          this.bankList = this.bankList. concat(_res.result)
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '获取账户列表失败!' + err
          })
        })
      },
      addBank(){
        this.addDialogVisible = true;
      },
      handleAdd(type) {
        if (type === false){
          this.addDialogVisible = false;
          this.addForm = {};
        }else if(type === true) {
          createBankAccount(this.addForm).then(_res => {
            if(_res.code === "B0001" || _res.code === "B0002"){
              this.$message({
                type: 'error',
                message: _res.msg
              });
            }else{
              this.$message({
                type:'success',
                message: "添加成功!"
              });
              this.addForm = {};
              this.addDialogVisible = false;
              this.getAllBanks();
            }
          })
        }
      },
      deleteBank(id){
        let config = {
          params:{
            id:id
          }
        };
        this.$confirm('是否刪除該賬号?', '提示' , {
          confirmButtonText:'确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBankAccount(config).then(_res => {
            if(_res.msg === 'Success'){
              this.$message({
                type:'success',
                message: '刪除成功!'
              })
              this.getAllBanks();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
        })
      },
      editBank(id){
        this.editForm = this.bankList.filter(x => x.id === id)[0];
        this.editDialogVisible = true;
      },
      handleEdit(type) {
        if(type === false){
          this.editDialogVisible = false;
          this.editForm = {};
        }else if (type === true) {
          updateBank(this.editForm).then(_res => {
            if(_res.code === 'B0003'){
              this.$message({
                type:'error',
                message:_res.msg
              })
            } else{
              this.$message({
                type:'success',
                message:'修改成功'
              })
              this.editForm = {};
              this.editDialogVisible = false;
              this.getAllBanks();
            }
          })
        }
      },
      close() {
        this.addForm = {};
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

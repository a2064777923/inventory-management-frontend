<template>
  <div class="card">
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>id: </strong>{{item.id}}</span>

            <el-button v-if="authorization() === 1" style="margin-left: 10px" type="success" icon="el-icon-check" circle
              size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 1" type="danger" icon="el-icon-close" circle size="mini"
              @click="deny(item.id)"></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 2" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 3" effect="dark" type='danger'>审核未通过</el-tag>
            </span>
          </el-col>
          <el-col :span="6">
            <el-button class="button" type="text" v-if="!showAll[index]" @click="changeState(index)">
              展开
            </el-button>
            <el-button class="button" type="text" v-if="showAll[index]" @click="changeState(index)">
              收起</el-button>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="30" style="margin-bottom: 10px">
            <span><strong>创建时间: </strong>{{item.createTime}}</span>
          </el-col>
        </el-row>
        <el-row>
          
          <el-col :span="8">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="10">
            <span><strong>总额合计: </strong>{{item.totalAmount}}(元)</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="24">
            <span><strong>备注: </strong>{{item.remark}}</span>
          </el-col>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <div style="margin-bottom: 15px"><strong>明细:</strong></div>
          <el-table :data="item.staffSheetContent" stripe style="width: 100%"
            :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column prop="id" label="id" width="100">
            </el-table-column>
            <el-table-column prop="name" label="名字" width="100">
            </el-table-column>
            <el-table-column prop="grossSalary" label="工资" width="100">
            </el-table-column>
            <el-table-column prop="personalIncomeTax" label="个人所得稅" width="100">
            </el-table-column>
            <el-table-column prop="unemploymentInsurance" label="失业保险" width="100">
            </el-table-column>
            <el-table-column prop="housingFund" label="住房公积金" width="100">
            </el-table-column>
            <el-table-column prop="finalSalary" label="实際發放" width="100">
            </el-table-column>
            <el-table-column prop="bankNo" label="銀行賬戶" width="180">
            </el-table-column>
            
            <el-table-column prop="remark" label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {salarySheetApproval} from '../../../network/financial'
  export default {
    name: "SalaryList",
    props: {
      list: Array,
      type: Number,
    },
    data() {
      return {
        showAll: [],
      }
    },
    mounted() {
      this.showAll = new Array(this.list.length).fill(false)

    },
    methods: {
      changeState(index) {
        this.$set(this.showAll, index, !this.showAll[index])
      },
      authorization() {
        if (this.type === 1 && (sessionStorage.getItem('role') === 'GM' || sessionStorage.getItem('role') ===
            'ADMIN')) {
          return 1
        } else {
          return 0
        }
      },
      approval(id) {
        let config = {
          params: {
            salarySheetId: id,
            state: 'SUCCESS'
          }
        }
        if (this.type === 1) {
          salarySheetApproval(config).then(res => {
            this.$emit("refresh")
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
          })
        }
    },
    deny(id) {
      let config = {
        params: {
          salarySheetId: id,
          state: 'FAILURE'
        }
      }
      if (this.type === 1) {
        salarySheetApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    },

    }
  }
</script>

<style lang="scss" scoped>
  .card {
    width: 80%;
    margin: 0 auto;

    .button {
      float: right;
      padding: 3px 0
    }
  }

  .el-card {
    margin-bottom: 20px;
    background: #EEF7F2;
  }
</style>

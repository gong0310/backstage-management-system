<template>
   <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card">
    <el-card>
       <el-table :data='rightsList' border stripe>
           <el-table-column type="index" label='序号'></el-table-column>
           <el-table-column label="权限名称" prop="authName"></el-table-column>
           <el-table-column label="路径" prop="path"></el-table-column>
           <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
       </el-table>
    </el-card>
    </div>
   </div> 
</template>
<script>
export default {
    data(){
       return{
         rightsList:[]
       }
    },
    created(){
       //获取所有的列表数据
       this.getRightsList()
    },
    methods:{
      async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！')
      }

      this.rightsList = res.data
      console.log(this.rightsList)
    }
    }
}
</script>
<style lang="less" scoped>
.card{
 height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
}

</style>
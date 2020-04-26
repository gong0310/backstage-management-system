<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
       
        <div class="logo" v-if="isCollapse">
          <img src="../assets/logo.jpg" alt="">
        </div>
         <span v-else>后台数据管理</span>
        <div class="toggle-button" @click="toggle" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></div>
      </div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span  @click="logout">退出登录</span></el-dropdown-item>
            <el-dropdown-item><span @click="anbang">关联店铺</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'" >
        <el-menu background-color="#fff" text-color="#333" active-text-color="#ea5420"
        unique-opened :collapse='isCollapse' :collapse-transition='false'
        :router='true' :default-active='activePath'>
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children"
             :key="subItem.id" @click='saveState("/"+subItem.path)'>
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList(),
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.replace('/login')
      window.WebIM.conn.close();
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('网络出错,刷新试试')
      this.menulist = res.data.slice(0,-1)
    },
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    saveState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    anbang(){
      this.$message('后台暂无数据')
    }
  }
}
</script>

<style lang="less" scoped>
.logo{
  img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #ea5420;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-menu{
  overflow: hidden;
  border-right: 0;
   .el-menu-item:hover{
    background-color: #fafafa !important;
  }

}





.iconfont {
  margin-right: 10px;
}
.el-icon-setting{
  font-size: 22px;
  color: #ffffff;
}
.toggle-button {
  background-color: #ea5420;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  padding-left: 10px;
  font-size: 22px;
  // width: 100%;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

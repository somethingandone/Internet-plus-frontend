<template>
    <el-container class="layout">
      <el-header class="header">
        <div id="title">
          外规内规匹配平台
        </div>
        <div id="info">
          <span>
            欢迎{{username}}
          </span>
        </div>
      </el-header>
      <el-container class="sub">
        <el-aside style="width: 12rem">
          <el-menu
              router
              active-text-color="#ffd04b"
              background-color="#545c64"
              default-active="match"
              text-color="#fff"
              class="el-menu"
          >
            <el-menu-item index="match">
            <span class="text"><el-icon><i-ep-search/></el-icon>
              外规匹配</span>
            </el-menu-item>
            <el-menu-item index="in">
          <span class="text"><el-icon><i-ep-collection/></el-icon>
              内规列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>


<script setup>

import {useRouter} from "vue-router";
const router = useRouter()
const username = "some"
</script>


<style>
.layout{
  height: 100%;
}

.header{
  background-color: #81d8cf;
  font-size: 25px;
  text-align: center;
  width: 100%;
  height: 5ch;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #55767b;
}
.el-menu{
  height: 100%;
}
#title{
  text-align: center;
}

#info{
  font-size: 12px;
  position: absolute;
  right: 20px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
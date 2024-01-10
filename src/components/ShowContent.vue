<template>
  <el-container id="mainLayout">
    <el-header class="header">
      <div id="top" >
        <div id="back" @click="back">
          <el-icon><i-ep-arrow-left-bold/></el-icon>
          返回
        </div>
        {{title}}
      </div>
    </el-header>
    <el-main>
      <el-text>
        {{content}}
      </el-text>
    </el-main>
  </el-container>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const id = route.query.id
const arr = JSON.parse(sessionStorage.getItem("ex" + id))
const content = arr["content"]
const title = arr["title"]

const back=() => {
  router.back()
}
</script>


<style scoped>
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

#back{
  font-size: 15px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
}
</style>
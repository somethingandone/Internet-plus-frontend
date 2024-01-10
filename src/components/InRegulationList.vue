<template>
  <div id="container">
    <div id="input">
      <el-collapse accordion v-model="selectIn">
        <el-collapse-item v-for="(ex, index) in relIn.arr" :key="index" :title="showTitle(ex.title)" :name="index">
          <p>{{ ex.content}}</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script setup>
import {getInRegulationList} from "@/api/match";

const selectIn = ref("")
const relIn = reactive({
  arr: []
})
function searchIn(){
  getInRegulationList().then(res => {
    relIn.arr = res.data.list
  })
}
const showTitle = (title) => {
  if(window.screen.width<900){
    return title.length>15?title.substr(0,15)+'...':title
  }
  return title.length>25?title.substr(0,25)+'...':title
}
</script>

<style scoped>

</style>
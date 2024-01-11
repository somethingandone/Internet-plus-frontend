<template>
  <div id="container">
    <div id="input">
      <el-collapse accordion>
        <el-collapse-item v-for="(ex, index) in relIn.arr"
                          :key="index"
                          :title="showTitle(ex.title)"
                          :name="index">
          <p>department: {{ex.department}}</p>
          <p>id: {{ex.id}}</p>
          <p>content: {{ex.content}}</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script setup>
import {getInRegulationList} from "@/api/match";

const relIn = reactive({
  arr: []
})

onMounted(() => {
  getInRegulationList().then(res => {
    relIn.arr = res.data.data.list
  })
})
const showTitle = (title) => {
  if(window.screen.width<900){
    return title.length>15?title.substr(0,15)+'...':title
  }
  return title.length>40?title.substr(0,40)+'...':title
}
</script>

<style scoped>

#input {
  width: 100%;
  height: 100%;
  border-right: 1px solid #181818;
  color: black;
  padding: 10px;
}

#container {
  display: inline-flex;
  width: 100%;
  height: 100%;
  padding: 0;
}


@media (max-width:900px){
  #container {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  #input {
    width: 100%;
    height: 50%;
    border-right: 1px solid #181818;
    color: black;
    padding: 10px;
  }
}

</style>
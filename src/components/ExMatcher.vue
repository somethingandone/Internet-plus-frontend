<template>
  <div id="container">
    <div id="input">
      <p class="listTitle">外规列表</p>
      <el-collapse accordion>

        <el-collapse-item v-for="(ex, index) in rel.arr"
                          :key="index"
                          :title="showTitle(ex.title)"
                          @click="matcher(ex.title, ex.text)"
                          :name="index">
          <p>摘要：{{ex.abstractContent}}</p>
          <p class="look" @click="getExContent(ex.id, ex.text, ex.title)">查看全文</p>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div id="result">
      <p class="listTitle">内规匹配结果</p>
      <el-collapse>
        <el-collapse-item v-for="(res, index) in result.arr" :key="index" :title="res.fileName" style="border-radius: 0">
          <p>{{ res.text }}</p>
          <p>相关性：{{ res.similarity}}</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import {getExRegulationList, match} from "@/api/match";
import router from "@/router";

const rel = reactive({
  arr : [],
})

const result = reactive({
  arr : []
})

onMounted(() =>{
  getExRegulationList().then((res) => {
    rel.arr = res.data.data.list
  })
})

const showTitle = (title) => {
  if(window.screen.width<900){
    return title.length>15?title.substr(0,15)+'...':title
  }
  return title.length>40?title.substr(0,40)+'...':title
}
const getExContent = (id, content, title)=>{
  const arr = {
    title: title,
    content: content
  }
  sessionStorage.setItem("ex"+id, JSON.stringify(arr))
  router.push({name:'showContent', query:{'id':id}})
}
const matcher = (title, text) => {
  const data = {
    title: title,
    text: text
  }
  result.arr = []
  match(data).then((res) => {
    result.arr = res.data.data
  })
}


</script>


<style scoped>
.look{
  color: #6b74d1;
  text-underline: #181818;
}
.listTitle{
  text-align: center;
  letter-spacing: 1rem;
  font-weight: bold;
}
#input {
  width: 50%;
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

#result {
  width: 50%;
  height: 100%;
  color: black;
  padding: 0;
}
</style>
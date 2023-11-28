<template>
  <div id="app">
    <home />
  </div>
</template>

<script>

  import Home from '@/views/Home.vue'
  import {defineComponent} from "vue";

  export default defineComponent({
    name: 'App',
    components: {Home}
  })


</script>

<style>

</style>

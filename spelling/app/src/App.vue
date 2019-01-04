<template>
  <div id="app">
    <WordSetSelector ref="wordSetSelector"/>
    <button v-on:click="updateList">Update List</button>
  </div>
</template>

<script>
import WordSetSelector from './components/WordSetSelector.vue'

export default {
  name: 'app',
  mounted: function(){
  },
  methods: {
    updateList : function(){
      this.$refs.wordSetSelector.init();
    }
  },
  components: {
    WordSetSelector
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

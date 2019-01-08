<template>
  <div id="app">
    <WordSetSelector ref="wordSetSelector"/>
  </div>
</template>

<script>
import WordSetSelector from "./components/WordSetSelector.vue";

export default {
  name: "app",
  mounted: function() {
    this.updateList();
  },
  methods: {
    updateList: function() {
      this.$refs.wordSetSelector.init();
    }
  },
  components: {
    WordSetSelector
  }
};
</script>

<style>
</style>

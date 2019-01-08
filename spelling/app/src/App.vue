<template>
  <div id="app">
    <WordSetSelector ref="wordSetSelector" v-on:add-new-wordlist="addNewWordList"/>
    <WordListEditor ref="wordListEditor"/>
  </div>
</template>

<script>
import WordSetSelector from "./components/WordSetSelector.vue";
import WordListEditor from "./components/WordListEditor.vue";

export default {
  name: "app",
  mounted: function() {
    this.updateList();
  },
  methods: {
    updateList: function() {
      this.$refs.wordSetSelector.init();
    },
    addNewWordList: function() {
      this.$refs.wordListEditor.toggleShow(true);
    }
  },
  components: {
    WordSetSelector,
    WordListEditor
  }
};
</script>

<style>
</style>

<template>
  <div id="app">
    <WordSetSelector
      ref="wordSetSelector"
      v-on:add-new-wordlist="addNewWordList"
      v-on:wordlist-selected="wordListSelected"
    />
    <WordListEditor ref="wordListEditor"/>
    <SpellingTest ref="spellingTest"/>
  </div>
</template>

<script>
import WordSetSelector from "./components/WordSetSelector.vue";
import WordListEditor from "./components/WordListEditor.vue";
import SpellingTest from "./components/SpellingTest.vue";

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
      this.$refs.spellingTest.toggleShow(false);
    },
    wordListSelected: function(listName) {
      this.$refs.spellingTest.init(listName);
      this.$refs.wordListEditor.toggleShow(false);
    }
  },
  components: {
    WordSetSelector,
    WordListEditor,
    SpellingTest
  }
};
</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
}
</style>

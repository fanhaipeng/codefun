<template>
  <div id="app">
    <h2>Spelling Test for Students</h2>
    <WordSetSelector
      ref="wordSetSelector"
      v-on:add-new-wordlist="addNewWordList"
      v-on:wordlist-selected="wordListSelected"
    />
    <WordListEditor ref="wordListEditor" v-on:wordlist-created="wordListCreated"/>
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
    },
    wordListCreated: function(){
      this.$refs.wordSetSelector.init();
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
  max-width: 640px;
  margin: auto;
  position: relative;
  min-height: 800px;
}

#app > h2{
  padding-bottom: 20px;
  border-bottom: dashed 4px #4a4;
}
</style>

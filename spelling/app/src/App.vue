<template>
  <div id="app">
    <h2>Spelling Test for Students</h2>
    <WordSetSelector
      ref="wordSetSelector"
      v-on:add-new-wordlist="addNewWordList"
      v-on:wordlist-selected="wordListSelected"
    />
    <WordListEditor ref="wordListEditor" v-on:wordlist-created="wordListCreated"/>
    <SpellingTest ref="spellingTest" v-bind:is-testmode="this.isTestMode"/>
  </div>
</template>

<script>
import WordSetSelector from "./components/WordSetSelector.vue";
import WordListEditor from "./components/WordListEditor.vue";
import SpellingTest from "./components/SpellingTest.vue";
import axios from "axios";

export default {
  name: "app",
  data: () => {
    return {
      isTestMode: true
    };
  },
  beforeMount: function() {
    axios.get("/env").then(response => {
      this.isTestMode = response.data.EnvMode !== "PROD";
    });
  },
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
    wordListCreated: function() {
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
  font-family: "Comic Sans MS", "Courier New";
  color: #434343;
}

#app > h2 {
  padding-bottom: 20px;
  border-bottom: dashed 4px #4a4;
  font-size: 32px;
  color: #44e;
}

button.close-window {
  position: absolute;
  top: 5px;
  right: 5px;
  border: solid 2px #4a4;
  background-color: buttonface;
  font-weight: bold;
  padding: 5px;
  line-height: 12px;
  border-radius: 50%;
  font-size: 18px;
  color: #444;
}

button.close-window:hover {
  cursor: pointer;
  background-color: #666;
  color: #fff;
}

button.action {
  border: solid 4px #4a4;
  font-size: 20px;
  border-radius: 15px;
  padding: 2px 20px;
  font-weight: bold;
  font-family: "Comic Sans MS", "Courier New";
  color: #444;
  margin-right: 10px;
}

button.action:hover {
  background-color: #444;
  color: #eee;
  cursor: pointer;
}

button.red {
  border-color: #a44;
}

button.green {
  border-color: #4a4;
}

h3 {
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 15px;
}
</style>

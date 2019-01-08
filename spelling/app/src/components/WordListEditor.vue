<template>
  <div class="wordlist-editor" v-if="visible">
    <label>Word List Name</label>
    <input v-model="wordListName" placeholder="New Word List Name">
    <label>Word List (One word per line)</label>
    <textarea v-model="wordList" placeholder="Please add words here, one word per line"/>
    <div class="wordlist-buttons">
      <button v-on:click="this.submitWordList">Submit</button>
      <button v-on:click="this.cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WordListEditor",
  data: () => {
    return {
      wordListName: "",
      wordList: "",
      visible: false
    };
  },
  methods: {
    toggleShow: function(show) {
      if (show) {
        this.wordListName = "";
        this.wordList = "";
      }
      this.visible = show;
    },
    cancel: function() {
      this.toggleShow(false);
    },
    submitWordList: function() {
      axios
        .put("/wordlist/" + this.wordListName, this.wordList)
        .then(response => {
          if (response.status !== 201) {
            alert("STATUS: " + response.status);
          } else {
            alert("Successfully created!");
          }
          this.cancel();
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style>
.wordlist-editor {
  padding: 15px;
  border: 1px solid #ddd;
  width: 300px;
  margin-top: 10px;
}
.wordlist-editor label {
  display: block;
  margin-bottom: 3px;
}

.wordlist-editor input {
  width: 280px;
}
.wordlist-editor textarea {
  width: 280px;
  height: 200px;
}
.wordlist-editor input,
.wordlist-editor textarea {
  margin-bottom: 15px;
}
</style>
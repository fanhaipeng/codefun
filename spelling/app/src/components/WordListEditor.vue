<template>
  <div class="wordlist-editor" v-if="visible">
    <h3>Create a new word list</h3>
    <label>Word List Name</label>
    <input v-model="wordListName" placeholder="New Word List Name">
    <label>Word List (One word per line)</label>
    <textarea v-model="wordList" placeholder="Please add words here, one word per line"/>
    <div class="wordlist-buttons">
      <button class="action green" v-on:click="this.submitWordList">Submit</button>
      <button class="action red" v-on:click="this.cancel">Cancel</button>
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
            this.$emit("wordlist-created");
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
  width: 300px;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.wordlist-editor label {
  display: block;
  margin-bottom: 3px;
  font-size: 20px;
  font-weight: bold;
}

.wordlist-editor input {
  width: 280px;
}
.wordlist-editor textarea {
  height: 400px;
}
.wordlist-editor input,
.wordlist-editor textarea {
  width: 80%;
  margin-bottom: 15px;
  border: solid 4px #aea;
  border-radius: 8px;
  padding: 5px;
  font-size: 24px;
  background-color: #efeeff;
}
</style>
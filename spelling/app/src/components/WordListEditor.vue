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
    <button class="close-window" v-on:click="toggleShow(false)">X</button>
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
            this.$emit('wordlist-created');
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
  position:absolute;
  top:0;
  width:100%;
  height: 100%;
  background-color:#fff;
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
  border: solid 4px #aea;
  border-radius: 8px;
  padding: 5px;
}

.wordlist-editor .close-window{
  position: absolute;
  top: 5px;
  right: 5px;
  border: solid 2px #4a4;
  background-color: #fff;
  font-weight: bold;
  padding: 3px;
  line-height: 12px;
  border-radius: 5px;
}

.wordlist-editor .close-window:hover{
  cursor: pointer;
  background-color: #666;
  color: #fff;
}
</style>
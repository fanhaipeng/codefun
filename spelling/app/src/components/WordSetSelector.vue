<template>
  <div v-on:load-wordset="init" class="wordlist-dropdown">
    <button v-on:click="addNew" class="wordlist-addnew">+</button>
    <h3>Choose one word list to start test</h3>
    <ul>
      <li v-on:click="loadWordList(list)" v-for="(list, index) in lists" :key="index">{{ list }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WordSetSelector",
  data: () => {
    return {
      lists: [],
    };
  },
  methods: {
    init: function() {
      axios
        .get("/wordlists")
        .then(response => {
          this.lists = response.data;
        })
        .catch(err => {
          alert(err);
        });
    },
    addNew: function() {
      this.$emit("add-new-wordlist");
    },
    loadWordList: function(listName) {
      this.$emit("wordlist-selected", listName);
    }
  }
};
</script>

<style>
.wordlist-dropdown  {
  padding: 0 20px;
}

.wordlist-dropdown ul {
  margin-top: 0;
  padding: 5px;
  width: 80%;
}

.wordlist-dropdown h3 {
  margin-bottom: 10px;
}

.wordlist-dropdown li {
  list-style: none;
  border-radius: 3px;
  background-color: #8dd;
  margin-bottom: 5px;
  padding: 5px;
}

.wordlist-dropdown li:hover {
  background-color: #6aa;
  cursor: pointer;
}

button.wordlist-addnew {
  background-color: white;
  border: solid 5px #4a4;
  border-radius: 12px;
  font-size: 48px;
  line-height: 24px;
  padding: 10px;
  color: #767676;
  position: absolute;
  right:0;
}

button.wordlist-addnew:hover {
  background-color: #666;
  cursor: pointer;
  color: #fff;
}
</style>



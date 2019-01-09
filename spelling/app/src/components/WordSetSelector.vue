<template>
  <div v-on:load-wordset="init" class="wordlist-dropdown">
    <button v-on:click="this.menuClicked" class="drop-btn">Select a Word List ▼</button>
    <ul v-if="this.menuOn">
      <li v-on:click="addNew" class="wordlist-addnew">Add New Word List</li>
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
      lists: ["list 1", "list 2", "list 3"],
      menuOn: false
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
    toggleMenu: function(show) {
      this.menuOn = show;
    },
    menuClicked: function() {
      this.menuOn = !this.menuOn;
    },
    addNew: function() {
      this.menuOn = false;
      this.$emit("add-new-wordlist");
      this.menuOn = false;
    },
    loadWordList: function(listName) {
      this.$emit("wordlist-selected", listName);
      this.menuOn = false;
    }
  }
};
</script>

<style>
.drop-btn {
  background-color: #c9c9c9;
  padding: 5px;
  border-radius: 3px;
}

.wordlist-dropdown ul {
  margin-top: 0;
  padding: 5px;
  background-color: #c9c9c9;
  width: 200px;
}

.wordlist-dropdown li {
  list-style: none;
  border-radius: 3px;
  background-color: #faa;
  margin-bottom: 5px;
  padding: 5px;
}

.wordlist-dropdown li:hover {
  background-color: #e66;
  cursor: pointer;
}

li.wordlist-addnew {
  background-color: #afa;
}
li.wordlist-addnew:hover {
  background-color: #aea;
}
</style>



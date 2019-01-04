<template>
  <div v-on:load-wordset="init">
    <div>Select a Word List</div>
    <ul>
      <li v-for="(list, index) in lists" :key="index">{{ list }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WordSetSelector",
  data: () => {
    return {
      lists: ["list 1", "list 2", "list 3"]
    };
  },
  methods: {
    init: function() {
        this.lists = ["aaa", "bbb", "ccc"]
    }
  }
};
</script>

<style>
</style>



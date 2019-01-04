<template>
<div v-on:load-wordset="init">
    <div>Select a Word List</div>
    <ul>
    </ul>
</div>    
</template>

<script>
export default {
    name: "WordSetSelector",
    props: {
    },
    methods:{
        init: function(){
            console.log('word list initialized');
        }
    }
}
</script>

<style>

</style>



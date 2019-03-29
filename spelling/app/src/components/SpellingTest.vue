<template>
  <div v-if="visible" class="spelling-test">
    <h3>{{ listName }}</h3>
    <div class="test-progress">
      <label>Total:</label>
      <span>{{this.words.length}}</span>
      <label>Current:</label>
      <span>{{ this.wordIndex + 1 }}</span>
      <label>Correct:</label>
      <span>{{ this.correctAnswers }}</span>
      <button class="close-window" v-on:click="toggleShow(false)">X</button>
    </div>
    <div v-if="!this.showSummary" class="test-panel">
      <button
        class="action green"
        href="Javascript:void();"
        v-on:click="playAudio(words[wordIndex])"
      >Pronounce &#x1f56a;</button>
      <input v-model="answer" placeholder="Type here">
      <button class="action green" v-on:click="checkAnswer">Check Answer</button>
    </div>
    <div v-if="this.showSummary" class="answer-summary">
      <div>{{ this.summaryText }}</div>
      <div v-if="misspellingList.length > 0 && wordIndex == words.length" class="misspelling-list">
        <label>Your misspellings:</label>
        <ul>
          <li v-for="(item, index) in misspellingList" :key="index">
            <table>
              <tr>
                <td>Word:</td>
                <td>{{item[0]}}</td>
              </tr>
              <tr>
                <td>Your spelling:</td>
                <td>{{item[1]}}</td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
      <button class="action green" v-if="wordIndex !== words.length" v-on:click="nextWord">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SpellingTest",
  data: () => {
    return {
      visible: false,
      listName: "",
      correctAnswers: 0,
      wordIndex: 0,
      words: [],
      answer: "",
      showSummary: false,
      summaryText: "",
      misspellingList: []
    };
  },
  props: ["isTestmode"],
  methods: {
    init: function(listName) {
      axios
        .get("/wordlist/" + listName)
        .then(response => {
          this.listName = listName;
          this.words = response.data.list;
          this.visible = true;
          this.showSummary = false;
          this.misspellingList = [];
          this.answer = "";
          this.correctAnswers = 0;
          this.wordIndex = 0;
        })
        .catch(err => {
          alert(err);
        });
    },
    toggleShow: function(show) {
      this.visible = show;
    },
    playAudio: function(word) {
      let containerName = this.$props.isTestmode ? "spelling-test" : "spelling";
      let audio = new Audio(
        `https://codefun.blob.core.windows.net/${containerName}/${word}.mp3`
      );
      audio.play();
    },
    checkAnswer: function() {
      if (this.answer.length === 0) {
        return;
      }

      if (
        this.answer.toLowerCase() === this.words[this.wordIndex].toLowerCase()
      ) {
        this.summaryText = `Your spelling of word '${this.answer}' is correct!`;
        this.correctAnswers++;
      } else {
        this.summaryText = `Your answer '${
          this.answer
        }' is wrong, correct spelling is '${this.words[this.wordIndex]}'`;

        this.misspellingList.push([this.words[this.wordIndex], this.answer]);
      }
      this.showSummary = true;
    },
    nextWord: function() {
      this.wordIndex++;
      if (this.wordIndex === this.words.length) {
        this.summaryText = `You've finished this spelling test, you successfully spelled out ${
          this.correctAnswers
        } out of ${this.words.length} words.`;
        this.showSummary = true;
        this.answer = "";
      } else {
        this.answer = "";
        this.showSummary = false;
      }
    }
  }
};
</script>

<style>
.spelling-test {
  padding: 10px;
  position: absolute;
  top: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
}

.test-progress {
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.test-progress span {
  margin-right: 20px;
}

.test-progress label {
  margin-right: 5px;
}

.test-progress button {
  float: right;
  border: none;
  background-color: #fff;
}

.test-progress button:hover {
  cursor: pointer;
}

.test-panel input {
  width: 80%;
  font-size: 32px;
  margin-right: 10px;
  display: block;
  padding-left: 5px;
  border: solid 4px #aaeeaa;
  border-radius: 10px;
  line-height: 48px;
  margin-bottom: 20px;
  padding-left: 5px;
  background-color: #efeeff;
}

.test-panel button:first-child {
  margin-bottom: 20px;
}

.answer-summary div {
  margin-bottom: 10px;
  font-size: 22px;
}

.misspelling-list li tr:last-child td:last-child {
  color: red;
}

.misspelling-list li tr:first-child td:last-child {
  color: green;
}

.misspelling-list li td:last-child {
  font-weight: bold;
  width: 200px;
  padding-left: 10px;
}

.misspelling-list li td:first-child {
  font-size: 16px;
  text-align: right;
}

.misspelling-list li {
  list-style: none;
  margin-bottom: 10px;
}
</style>
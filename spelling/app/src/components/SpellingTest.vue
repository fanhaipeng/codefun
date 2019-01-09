<template>
  <div v-if="visible" class="spelling-test">
    <div class="test-progress">
      <label>Total:</label>
      <span>{{this.words.length}}</span>
      <label>Correct:</label>
      <span>{{ this.correctAnswers }}</span>
      <label>List Name:</label>
      <span>{{ this.listName }}</span>
    </div>
    <div v-if="!this.showSummary" class="test-panel">
      <label>
        Click this audio button
        <button v-on:click="playAudio(words[wordIndex])">&#x1f50a;</button> and spell out the word you hear
      </label>
      <input v-model="answer">
      <button v-on:click="checkAnswer">Check Answer</button>
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
      <button v-if="wordIndex !== words.length" v-on:click="nextWord">Next</button>
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
        })
        .catch(err => {
          alert(err);
        });
    },
    toggleShow: function(show) {
      this.visible = show;
    },
    playAudio: function(word) {
      let audio = new Audio(
        `https://codefun.blob.core.windows.net/spelling/${word}.mp3`
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
  border: 1px solid #ddd;
  margin-top: 10px;
}

.test-progress {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.test-progress span {
  margin-right: 20px;
}

.test-progress label {
  margin-right: 5px;
}
.test-panel label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
}

.test-panel input {
  width: 300px;
  font-size: 24px;
  margin-right: 10px;
}

.test-panel label button {
  font-size: 20px;
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
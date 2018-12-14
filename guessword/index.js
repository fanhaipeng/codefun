import axios from 'axios';

var vm = new Vue({
    el: '#guessword',
    data: {
        word: [],
        letters: []
    },

    created: function () {
        this.init();
    },

    methods: {
        init: function () {
            this.letters = [];
            for (let l of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
                this.letters.push({
                    value: l,
                    tried: false
                })
            }

            this.loadWord();
        },

        loadWord: function () {
            axios.get('/next')
                .then(response => {
                    this.word = [];
                    for (let w of response.data) {
                        this.word.push({
                            value: w,
                            guessed: false
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        },

        letterClicked: function (letter) {
            for (let l of this.letters) {
                if (l.value === letter) {
                    if (l.tried) {
                        return;
                    }

                    l.tried = true;
                    break;
                }
            }

            for (let l of this.word) {
                if (letter === l.value) {
                    l.guessed = true;
                }
            }

            let guessStatus = this.word.filter(w => !w.guessed);
            setTimeout((result) => {
                if (result.length === 0) {
                    alert("Congratulations, you've guessed the word!");
                    this.init();
                }
            }, 50, guessStatus);
        }
    }
})
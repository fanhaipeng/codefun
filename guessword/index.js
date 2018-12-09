var vm = new Vue({
    el: '#guessword',
    data:{
        word: [{ value: 'b', guessed: false},
               { value: 'o', guessed: false},
               { value: 'o', guessed: false},
               { value: 'k', guessed: false},
               { value: 'c', guessed: false},
               { value: 'a', guessed: false},
               { value: 's', guessed: false},
               { value: 'e', guessed: false}
            ],
        letters: 'abcdefghijklmnopqrstuvwxyz'.split('')
    },
    methods:{
        letterClicked: function(letter) {
            for (let l of this.word){
                if (letter === l.value){
                    l.guessed = true;
                }
            }
        }
    }
});
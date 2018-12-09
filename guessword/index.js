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
        letters: []
    },
    methods:{
        init: function(){
            for (let l of 'abcdefghijklmnopqrstuvwxyz'.split('')){
                this.letters.push({
                    value: l,
                    tried: false
                })
            }
        },

        letterClicked: function(letter) {
            for (let l of this.letters){
                if (l.value === letter){
                    if (l.tried){
                        return;
                    }

                    l.tried = true;
                    break;
                }
            }
            
            for (let l of this.word){
                if (letter === l.value){
                    l.guessed = true;
                }
            }
        }
    }
});
vm.init();
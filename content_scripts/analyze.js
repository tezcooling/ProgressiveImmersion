progressiveImmersion.trackElement = function (elem){
    progressiveImmersion.viewObserver.observe(elem);
}

    
progressiveImmersion.viewObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting && !entry.target.analyzed){
            entry.target.analyzed = true;
            var words = entry.target.textContent.match(/[\p{L}-]+/ug);
            
            if(words){
                for(var word of words){
                    if(word.length > 2){
                        countWord(word.toLowerCase());
                    }
                }
                wordTally = new Map([...wordTally].sort((a, b) => a[1] - b[1]));
                console.log(wordTally);
            }
        }
    })
});

var wordTally = new Map();
function countWord(word){
    if(!wordTally.has(word)){
        wordTally.set(word, 0);
    }
    wordTally.set(word, wordTally.get(word) + 1);
}

window.onbeforeunload = () => {
    browser.storage.local.get("state").then((value) => {
        if(value.state){
            wordTally = new Map([...wordTally].sort((a, b) => b[1] - a[1]));
        }
    });
}
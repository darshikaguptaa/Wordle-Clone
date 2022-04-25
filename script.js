const words = ['clone','tribe','climb','trick','scale','style','pluck','fruit','click','light','sight','flood','cloud','baker','taken','dried','tense','blood'];
const lettersPattern = /[a-z]/; 
let count = 1;
let currentRow = document.getElementById(`row${count}`);

const choose = () => {
    let random = Math.floor(Math.random()*words.length);
    return words[random];
}

let solution = choose()
console.log(solution)

const updateLetters = (letter)=>{
    currentRow.dataset.letters += letter;
    let length = currentRow.dataset.letters.length;
    updateBox(length,letter);
}


const updateBox = (wordNum,letter) =>{
    let word = document.getElementById(`word${count}${wordNum}`)
    word.textContent = letter;
    word.classList.add("filled");
    // word.dataset.alpha = letter;
}


const deleteLetters = ()=> {
    let letters = currentRow.dataset.letters;
    if(letters.length==0) {
        return
    }
    deleteBox(letters.length)
    currentRow.dataset.letters = currentRow.dataset.letters.slice(0,-1);
}


const deleteBox = (wordNum)=>{
    let word = document.getElementById(`word${count}${wordNum}`)
    word.textContent = ""
    word.classList.remove("filled");
}

const checkLetter = (i,word,letters)=>{

    let status = ""
    if(letters[i]==solution[i]){
        status = "correct";
        addstatus(word,status);
    }
    else if(solution.includes(letters[i])){
        status = "present";
        addstatus(word,status);
    }
    else{
        status = "absent";
        addstatus(word,status);
    }
}


const addstatus = (word,status) => {
    word.classList.add("flip-in");
    setTimeout(()=>{
        word.classList.add(status);
    },250);
    setTimeout(()=>{
        word.classList.remove("flip-in");
        word.classList.add("flip-out");
    },250);
    setTimeout(()=>{
        word.classList.remove("flip-out");
    },1500);
} 

const flipDelay =(i,word,letters) => {
    setTimeout(() => {
        checkLetter(i,word,letters);
    }, i*200);
}

const win = () => {
    for(i=0;i<5;i++){
        setTimeout(() => {
            console.log(count,i)
            let word = document.getElementById(`word${count}${i+1}`);
            console.log(word)
            word.classList.add('win');
            console.log(word)
        }, i*200);
        
    }
}


document.addEventListener('keydown',(e)=>{

    if(count<7){
        letters = currentRow.dataset.letters;
        let keyPress = e.key
            if(keyPress.length == 1 && lettersPattern.test(e.key))
        {
            if(letters.length<5){
                updateLetters(keyPress);
            }
        }


        else if(keyPress=="Backspace") {
            deleteLetters()
        }

        else if(e.key=="Enter" && letters.length==5) {
            // console.log(letters)
            for(i=0;i<5;i++){
                let word = document.getElementById(`word${count}${i+1}`);
                flipDelay(i,word,letters);
            }
            checkWin(letters);
        }
    }
    else{
        alert(`You Lost !, The word was ${solution}`);
    }
    
})  

const checkWin = (letters) =>{
    if (letters == solution) {
        setTimeout(()=>{
            alert("You won");
        },1500);
        // win();
    }
    else{
        count = count + 1;
        currentRow = document.getElementById(`row${count}`);
    }
}
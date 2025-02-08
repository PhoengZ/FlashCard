let qb = document.querySelector(".question-block");
let ab = document.querySelector(".answer-block");
let question = document.querySelector("#Question");
let Answer = document.querySelector("#Answer");
let rev = document.querySelector("#reveal");
let nq = document.querySelector("#next-question");

let question_now = getQuestion();

async function getQuestion() {
    let response = await fetch("https://random-word-api.herokuapp.com/word");
    if (!response.ok){
        question.innerText = "Error on fetching to randon-word-api";
        return;
    }
    const word = await response.json();
    question.innerText = word[0];
    question_now = word[0];
}
async function getAnswer(word){
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok){
        Answer.innerText = "์Not found a word in oxford-dictionary"
        return;
    }
    const ans = await response.json();
    Answer.innerText = ans[0].meanings[0].definitions[0].definition;
}

rev.addEventListener("click",async()=>{
    await getAnswer(question_now);
    qb.hidden = true;
    ab.hidden = false;
})
nq.addEventListener("click", async ()=>{
    await getQuestion();
    qb.hidden = false;
    ab.hidden = true;
});

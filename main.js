let qb = document.querySelector(".question-block");
let ab = document.querySelector(".answer-block");
let question = document.querySelector("#Question");
let Answer = document.querySelector("#Answer");
let rev = document.querySelector("#reveal");
let nq = document.querySelector("#next-question");

let question_now = "";
rev.disabled = true;
ab.style.display  = "none";
getQuestion();

async function getQuestion() {
    nq.disabled = true;
    rev.disabled = true;
    let response = await fetch("https://random-word-api.herokuapp.com/word");
    let word = await response.json();
    while (await getAnswer(word[0],false) === "Not found"){
        response = await fetch("https://random-word-api.herokuapp.com/word");
        word = await response.json();
    }
    question.innerText = word[0];
    question_now = word[0];
    nq.disabled = false;
    rev.disabled = false;
}
async function getAnswer(word,b){
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok){
        return "Not found";
    }
    const ans = await response.json();
    if (b)Answer.innerText = ans[0].meanings[0].definitions[0].definition;
    return "Found";
}
rev.addEventListener("click",async()=>{
    if (rev.disabled) return;
    await getAnswer(question_now,true);
    qb.style.display = "none";
    ab.style.display  = "flex";
})
nq.addEventListener("click", async ()=>{
    await getQuestion();
    qb.style.display = "flex";
    ab.style.display  = "none";
});


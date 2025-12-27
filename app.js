/***********************
 * CONFIG
 ***********************/
const AD_URL = "https://otieu.com/4/10382983"; // Monetag Video Ad
const REWARD_PER_CORRECT = 0.10; // 0.10 taka
const MAX_QUESTIONS_PER_DAY = 120;

/***********************
 * QUIZ DATA (Example)
 ***********************/
const quizData = [
    {
        question: "বাংলাদেশের রাজধানী কী?",
        options: ["ঢাকা", "চট্টগ্রাম", "খুলনা", "রাজশাহী"],
        answer: 0
    },
    {
        question: "২ + ২ = কত?",
        options: ["৩", "৪", "৫", "৬"],
        answer: 1
    },
    {
        question: "সূর্য কোন দিকে ওঠে?",
        options: ["পশ্চিম", "উত্তর", "পূর্ব", "দক্ষিণ"],
        answer: 2
    }
];

/***********************
 * STATE
 ***********************/
let currentQuestion = 0;
let selectedOption = null;

let balance = parseFloat(localStorage.getItem("balance")) || 0;
let answeredToday = parseInt(localStorage.getItem("answeredToday")) || 0;
let lastDate = localStorage.getItem("lastDate");

/***********************
 * DAILY RESET
 ***********************/
const today = new Date().toDateString();
if (lastDate !== today) {
    answeredToday = 0;
    localStorage.setItem("answeredToday", answeredToday);
    localStorage.setItem("lastDate", today);
}

/***********************
 * DOM ELEMENTS
 ***********************/
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submitBtn");
const balanceEl = document.getElementById("balance");
const statusEl = document.getElementById("status");

/***********************
 * INIT
 ***********************/
updateBalance();
loadQuestion();

/***********************
 * FUNCTIONS
 ***********************/
function loadQuestion() {
    if (answeredToday >= MAX_QUESTIONS_PER_DAY) {
        questionEl.innerText = "আজকের কুইজ শেষ ✅";
        optionsEl.innerHTML = "";
        submitBtn.style.display = "none";
        return;
    }

    const q = quizData[currentQuestion];
    questionEl.innerText = q.question;
    optionsEl.innerHTML = "";
    selectedOption = null;

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option-btn";
        btn.onclick = () => selectOption(index, btn);
        optionsEl.appendChild(btn);
    });
}

function selectOption(index, btn) {
    selectedOption = index;
    document.querySelectorAll(".option-btn").forEach(b => {
        b.classList.remove("active");
    });
    btn.classList.add("active");
}

function submitAnswer() {
    if (selectedOption === null) {
        alert("একটি অপশন নির্বাচন করুন");
        return;
    }

    const correct = quizData[currentQuestion].answer;

    if (selectedOption === correct) {
        balance += REWARD_PER_CORRECT;
        statusEl.innerText = "✅ সঠিক উত্তর!";
    } else {
        statusEl.innerText = "❌ ভুল উত্তর!";
    }

    answeredToday++;
    saveData();
    updateBalance();
    showAd();

    currentQuestion++;
    if (currentQuestion >= quizData.length) {
        currentQuestion = 0;
    }

    setTimeout(() => {
        statusEl.innerText = "";
        loadQuestion();
    }, 1000);
}

function showAd() {
    window.open(AD_URL, "_blank");
}

function updateBalance() {
    balanceEl.innerText = balance.toFixed(2) + " টাকা";
}

function saveData() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("answeredToday", answeredToday);
}

/***********************
 * EVENTS
 ***********************/
submitBtn.addEventListener("click", submitAnswer);

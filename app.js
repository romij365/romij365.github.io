const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const userBox = document.getElementById("userBox");
const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");

// Telegram user
const user = tg.initDataUnsafe.user;

if (user) {
  userBox.innerHTML = `
    👤 User: ${user.first_name}<br>
    🆔 ID: ${user.id}
  `;
} else {
  userBox.innerText = "Not opened from Telegram";
}

// Dummy quiz
const quiz = {
  q: "বাংলাদেশের রাজধানী কোনটি?",
  options: ["ঢাকা", "চট্টগ্রাম", "খুলনা", "রাজশাহী"],
  correct: "ঢাকা"
};

startBtn.onclick = () => {
  startBtn.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuiz();
};

function loadQuiz() {
  questionEl.innerText = quiz.q;
  optionsEl.innerHTML = "";

  quiz.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;

    div.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(div);
  });
}

function checkAnswer(answer) {
  if (answer === quiz.correct) {
    resultEl.innerText = "✅ Correct! +0.1৳";
  } else {
    resultEl.innerText = "❌ Wrong Answer";
  }

  // 👉 এখানে পরে Monetag Ad দেখানো হবে
}

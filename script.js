const slides = document.querySelectorAll(".slide");
const counter = document.getElementById("slideCounter");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

let currentSlide = 0;

// Слайд бүрийн доод цэгийг үүсгэх
slides.forEach((slide, index) => {
  const dot = document.createElement("button");

  dot.className = "dot";
  dot.setAttribute("aria-label", `${index + 1}-р слайд`);
  dot.title = `${index + 1}-р слайд`;

  dot.addEventListener("click", () => {
    showSlide(index);
  });

  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".dot");

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;

  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });

  counter.textContent = `${currentSlide + 1} / ${slides.length}`;

  progressBar.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;

  prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

prevBtn.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

nextBtn.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

// Гарны сум ашиглан слайд солих
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    showSlide(currentSlide + 1);
  }

  if (event.key === "ArrowLeft") {
    showSlide(currentSlide - 1);
  }
});

// 17-р слайдын товчны жишээ
const demoButton = document.getElementById("demoButton");
const demoTitle = document.getElementById("demoTitle");

demoButton.addEventListener("click", () => {
  demoTitle.textContent = "Би код бичиж чадна!";
  demoTitle.style.color = "#7c3aed";
});

// 18-р слайдын оноо бодох програм
document.getElementById("calculateBtn").addEventListener("click", () => {
  const input = document.getElementById("correctCount");
  const result = document.getElementById("scoreResult");
  const correct = Number(input.value);

  if (input.value.trim() === "" || !Number.isInteger(correct)
      || correct < 0 || correct > 20) {
    result.textContent = "0–20 хооронд бүхэл тоо оруулна уу.";
    return;
  }

  const percent = correct / 20 * 100;

  let grade;

  if (percent >= 90) {
    grade = "Маш сайн!";
  } else if (percent >= 80) {
    grade = "Сайн!";
  } else if (percent >= 60) {
    grade = "Тэнцсэн.";
  } else {
    grade = "Дахин давтаарай.";
  }

  result.textContent = `Оноо: ${correct}/20 | ${percent}% — ${grade}`;
});

// 20-р слайдын эцсийн сорил
document.getElementById("quizForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const answers = {
    q1: "b",
    q2: "c",
    q3: "a",
    q4: "b",
    q5: "c"
  };

  let score = 0;
  const form = event.currentTarget;

  for (const question in answers) {
    const selected = form.querySelector(
      `input[name="${question}"]:checked`
    );

    if (selected && selected.value === answers[question]) {
      score++;
    }
  }

  const result = document.getElementById("quizResult");
  result.textContent = `Таны дүн: ${score}/5 (${score * 20}%).`;

  if (score === 5) {
    result.textContent += " Баяр хүргэе! Бүх хариулт зөв.";
  } else {
    result.textContent += " Алдаатай асуултуудаа дахин судлаарай.";
  }
});

// Эхний слайдыг харуулах
showSlide(0);
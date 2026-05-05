// Typing effect (keeps Portfolio 1 feel, with motion-focused roles)
const texts = [
  "Motion Designer",
  "Animator",
  "Video Editor"
];

let speed = 100;
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
  if (!typing) return;
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typing.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typing.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : speed);
}

typeEffect();

// Fade-in on scroll (IntersectionObserver, same "show" class as Portfolio 1)
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.15 }
);
sections.forEach((sec) => observer.observe(sec));

// Mobile menu toggle (Portfolio 1 behavior)
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

function toggleMenu() {
  if (!navbar) return;
  navbar.classList.toggle("active");
}

if (menuIcon) {
  menuIcon.addEventListener("click", toggleMenu);
  menuIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") toggleMenu();
  });
}

// Close menu after clicking a link (mobile)
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => navbar?.classList.remove("active"));
});

// Skills progress fill on scroll
(() => {
  const cards = document.querySelectorAll("[data-skill]");
  if (!cards.length) return;

  const animateCard = (card) => {
    if (card.dataset.animated === "1") return;
    card.dataset.animated = "1";

    const level = Number(card.getAttribute("data-level") || "0");
    const safeLevel = Math.max(0, Math.min(100, level));
    const fill = card.querySelector("[data-skill-fill]");
    const percent = card.querySelector("[data-skill-percent]");
    const bar = card.querySelector(".skill-bar");

    if (fill) fill.style.width = `${safeLevel}%`;
    if (percent) percent.textContent = `${safeLevel}%`;
    if (bar) bar.setAttribute("aria-valuenow", String(safeLevel));
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) animateCard(e.target);
      });
    },
    { threshold: 0.35 }
  );

  cards.forEach((c) => io.observe(c));
})();

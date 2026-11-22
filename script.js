// ---------- Mobile menu ----------
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Dark / light theme (remembered) ----------
const themeBtn = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}
themeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ---------- Typing effect ----------
const words = ["Web Developer", "Frontend Designer", "Problem Solver"];
const typingEl = document.getElementById("typing");
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = words[wordIndex];
  typingEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 110);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1200);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

// ---------- Scroll reveal, skill bars, counters ----------
function animateCounter(el) {
  const target = +el.dataset.target;
  let current = 0;
  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 120);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const section = entry.target;
    section.classList.add("visible");

    section.querySelectorAll(".fill").forEach(bar => {
      bar.style.width = bar.dataset.width + "%";
    });
    section.querySelectorAll(".count").forEach(animateCounter);

    observer.unobserve(section);
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- Project filter ----------
const filterBtns = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle("hide", filter !== "all" && card.dataset.cat !== filter);
    });
  });
});

// ---------- Contact form validation ----------
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

function setError(input, message) {
  const field = input.parentElement;
  field.classList.toggle("invalid", !!message);
  field.querySelector(".error").textContent = message;
  return !message;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const okName = setError(name, name.value.trim().length < 2 ? "Please enter your name." : "");
  const okEmail = setError(
    email,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? "" : "Please enter a valid email."
  );
  const okMsg = setError(message, message.value.trim().length < 10 ? "Message must be at least 10 characters." : "");

  if (okName && okEmail && okMsg) {
    status.textContent = "Thanks! Your message has been sent (demo).";
    form.reset();
    setTimeout(() => (status.textContent = ""), 4000);
  } else {
    status.textContent = "";
  }
});

// ---------- Active nav link, back-to-top, year ----------
const sections = document.querySelectorAll("main section");
const toTop = document.getElementById("to-top");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  toTop.classList.toggle("show", window.scrollY > 400);
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();

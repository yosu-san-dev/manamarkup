/* ============================
   Language Selector
============================ */

const langBtn = document.getElementById("lang-btn");
const langMenu = document.getElementById("lang-menu");

langBtn.addEventListener("click", () => {
    langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
});

// Close language menu when clicking outside
window.addEventListener("click", (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = "none";
    }
});


/* ============================
   Side Panel (Slide-in Menu)
============================ */

const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const panel = document.getElementById("slide-panel");
const overlay = document.getElementById("overlay");

openBtn.addEventListener("click", () => {
    panel.classList.add("open");
    overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
    overlay.style.display = "none";
});

// Close panel and overlay if clicking outside
window.addEventListener("click", (e) => {
    if (!openBtn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove("open");
        overlay.style.display = "none";
    }
});
/* ============================================================
   agenticPH Labs — Portfolio JS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Theme Toggle ---------- */
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Restore saved theme
  const savedTheme = localStorage.getItem("agenticph-theme");
  if (savedTheme === "dark") body.classList.add("dark");

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("agenticph-theme",
      body.classList.contains("dark") ? "dark" : "light");
  });

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById("mobile-nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Smooth scroll for anchor links (fallback) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

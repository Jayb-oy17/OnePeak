// script.js - ONE PEAK Multi-Page Script
document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking navigation links
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", function () {
      // Close other open items
      const parent = this.parentElement;
      if (parent) {
        parent.querySelectorAll(".faq-item.open").forEach((openItem) => {
          if (openItem !== this) {
            openItem.classList.remove("open");
            const icon = openItem.querySelector(".faq-question i");
            if (icon) {
              icon.classList.remove("fa-chevron-up");
              icon.classList.add("fa-chevron-down");
            }
          }
        });
      }

      // Toggle current item
      this.classList.toggle("open");
      const icon = this.querySelector(".faq-question i");
      if (icon) {
        if (this.classList.contains("open")) {
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        } else {
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        }
      }
    });
  });

  // ============================================
  // Scroll Animations (Intersection Observer)
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    [
      ".glass-card",
      ".feature-card",
      ".metric-card",
      ".program-card",
      ".coach-card",
      ".curriculum-module",
      ".testimonial-card",
      ".stat-box",
      ".channel-card",
      ".faq-item",
      ".pricing-card",
      ".hero-text",
      ".hero-visual",
      ".cta-box",
    ].join(","),
  );

  animatedElements.forEach((el) => {
    // Set initial state
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Make elements visible immediately if they're already in view on page load
  setTimeout(() => {
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }, 100);

  // ============================================
  // Active Navigation Link Highlighting
  // ============================================
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
});

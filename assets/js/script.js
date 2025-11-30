let vantaEffect = null;

window.addEventListener("DOMContentLoaded", () => {
  // Init VANTA.NET
  if (window.VANTA && window.VANTA.NET) {
    vantaEffect = window.VANTA.NET({
      el: "#vanta-background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x1d9bf0,
      backgroundColor: 0x20252b,
      points: 4.0,
      maxDistance: 18.0,
      spacing: 28.0,
      showDots: true
    });
  }

  // Page nav switching (about / projects)
  const navButtons = document.querySelectorAll(".navbar-link");
  const pages = document.querySelectorAll(".page");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-nav-link");

      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      pages.forEach((page) => {
        if (page.getAttribute("data-page") === target) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });
    });
  });

  // Mobile navbar: clone desktop nav into slide-out pane
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenuPane = document.getElementById("mobile-menu-pane");
  const mainNav = document.getElementById("main-nav");

  if (mainNav && mobileMenuPane) {
    mobileMenuPane.innerHTML = mainNav.innerHTML;

    // attach nav switching to cloned buttons too
    const mobileButtons = mobileMenuPane.querySelectorAll(".navbar-link");
    mobileButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-nav-link");

        // update main nav active state
        navButtons.forEach((b) => b.classList.remove("active"));
        const matching = Array.from(navButtons).find(
          (b) => b.getAttribute("data-nav-link") === target
        );
        if (matching) matching.classList.add("active");

        // switch pages
        pages.forEach((page) => {
          if (page.getAttribute("data-page") === target) {
            page.classList.add("active");
          } else {
            page.classList.remove("active");
          }
        });

        mobileMenuPane.classList.remove("is-open");
      });
    });
  }

  if (mobileToggle && mobileMenuPane) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenuPane.classList.toggle("is-open");
    });
  }
});

// optional Vanta cleanup
window.addEventListener("beforeunload", () => {
  if (vantaEffect && vantaEffect.destroy) {
    vantaEffect.destroy();
  }
});

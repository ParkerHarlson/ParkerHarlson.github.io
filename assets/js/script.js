let vantaEffect = null;

window.addEventListener("DOMContentLoaded", () => {
  // Init VANTA.NET if available
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
      color: 0x4f46e5,
      backgroundColor: 0x050816,
      points: 10.0,
      maxDistance: 22.0,
      spacing: 18.0
    });
  }

  // Nav switching
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
});

// optional cleanup
window.addEventListener("beforeunload", () => {
  if (vantaEffect && vantaEffect.destroy) {
    vantaEffect.destroy();
  }
});

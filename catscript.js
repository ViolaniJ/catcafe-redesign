document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Fade-out before page leave
document.querySelectorAll("a[href]").forEach(link => {
  const url = new URL(link.href);
  const isSameOrigin = url.origin === location.origin;

  if (isSameOrigin && !link.href.includes("#")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove("fade-in");
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = link.href;
      }, 400); // Matches CSS transition time
    });
  }
});
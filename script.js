(function () {
  // Menú móvil
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");
  if (toggle && nav) {
    function setOpen(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      toggle.textContent = open ? "✕" : "☰";
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Carruseles de capturas (soporta varios en la página)
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = Array.from(track.children);
    let index = 0;

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Ir a la captura " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, di) {
        d.classList.toggle("active", di === index);
      });
    }

    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });

    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });

    document.addEventListener("keydown", function (e) {
      const rect = carousel.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    let startX = 0;
    let isDragging = false;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener("touchend", function (e) {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(index + 1);
        else goTo(index - 1);
      }
    }, { passive: true });
  });
  // Lightbox: click en la imagen del slide para verla en grande
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  if (lightbox && lightboxImg && lightboxClose) {
    const slides = Array.from(document.querySelectorAll(".carousel-slide img"));
    let currentIndex = 0;

    function showImage(i) {
      currentIndex = (i + slides.length) % slides.length;
      lightboxImg.src = slides[currentIndex].src;
      lightboxImg.alt = slides[currentIndex].alt || "";
    }

    function openLightbox(i) {
      showImage(i);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function next() { showImage(currentIndex + 1); }
    function prev() { showImage(currentIndex - 1); }

    slides.forEach(function (img, idx) {
      img.addEventListener("click", function (e) {
        e.stopPropagation();
        openLightbox(idx);
      });
    });

    if (lightboxPrev) lightboxPrev.addEventListener("click", function (e) { e.stopPropagation(); prev(); });
    if (lightboxNext) lightboxNext.addEventListener("click", function (e) { e.stopPropagation(); next(); });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });

    // Swipe tactil
    let startX = 0;
    lightbox.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next(); else prev();
      }
    }, { passive: true });
  }
})();
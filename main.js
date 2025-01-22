// Navbar Active Link
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// Navbar Scroll Effect with Progress
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const scrollProgress =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    navbar.style.setProperty("--scroll-progress", `${scrollProgress}%`);
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active link based on scroll position
  const sections = document.querySelectorAll("section");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop - 60 && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Smooth scroll with animation duration based on distance
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const startPosition = window.scrollY;
    const targetPosition = target.offsetTop;
    const distance = Math.abs(targetPosition - startPosition);
    const duration = Math.min(1000, Math.max(500, distance / 2));

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// Animasi untuk highlight text
const highlights = document.querySelectorAll(".highlight");
highlights.forEach((highlight) => {
  highlight.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.1)";
    this.style.transition = "transform 0.3s ease";
  });

  highlight.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });
});

// Initialize Swiper
const facilitiesSwiper = new Swiper(".facilitiesSwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  speed: 800,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
  },
  on: {
    init: function () {
      setTimeout(() => {
        this.update();
      }, 100);
    },
  },
});

// Smooth Scroll with jQuery
$(document).ready(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    const target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 100,
        },
        800,
        "swing"
      );
    }
  });

  // Navbar Animation
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  // Add animation to elements on scroll
  $(window).scroll(function () {
    $(".animate-on-scroll").each(function () {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass("animate__animated animate__fadeInUp");
      }
    });
  });

  // Immediately show initial animations
  setTimeout(function () {
    $(".nav-item").addClass("active");
    $(".fade-in, .fade-right, .fade-left, .zoom-in").addClass("active");
  }, 100);

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll animations
  function handleScrollAnimations() {
    $(
      ".scroll-fade-in, .scroll-fade-right, .scroll-fade-left, .scroll-zoom-in, .section-animate"
    ).each(function () {
      if (isInViewport(this)) {
        $(this).addClass("active");
      }
    });
  }

  // Run on page load
  handleScrollAnimations();

  // Run on scroll with throttle
  let scrollTimeout;
  $(window).on("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        handleScrollAnimations();
        scrollTimeout = null;
      }, 50);
    }
  });

  // Add hover animation for facility cards
  document.querySelectorAll(".facility-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-20px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      facilitiesCarousel.scrollLeft += 1;
      if (
        facilitiesCarousel.scrollLeft + facilitiesCarousel.clientWidth >=
        facilitiesCarousel.scrollWidth
      ) {
        facilitiesCarousel.scrollLeft = 0;
      }
    }, 20);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  facilitiesCarousel.addEventListener("mouseenter", stopAutoScroll);
  facilitiesCarousel.addEventListener("mouseleave", startAutoScroll);

  startAutoScroll();
});

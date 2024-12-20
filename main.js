// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlides() {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Sembunyikan semua slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Reset semua dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Tampilkan slide yang aktif
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Auto slide
setInterval(function () {
  plusSlides(1);
}, 5000); // Change slide every 5 seconds

// Inisialisasi variabel untuk cards
document.addEventListener("DOMContentLoaded", function () {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  const facilityCards = document.querySelectorAll(".facility-card");

  let currentPosition = 0;
  const cardWidth = 320; // Lebar tetap untuk setiap card

  // Fungsi untuk menggeser card
  function shiftCards(direction) {
    // Hitung total card dan batasan pergeseran
    const totalCards = facilityCards.length;
    const maxPosition = totalCards - 3; // Tampilkan 3 card sekaligus

    // Update posisi berdasarkan arah
    if (direction === 1) {
      // next
      currentPosition =
        currentPosition >= maxPosition ? 0 : currentPosition + 1;
    } else {
      // prev
      currentPosition =
        currentPosition <= 0 ? maxPosition : currentPosition - 1;
    }

    // Terapkan pergeseran
    const translateX = -currentPosition * cardWidth;
    console.log("Shifting cards:", { direction, currentPosition, translateX }); // Debug
    cardsWrapper.style.transform = `translateX(${translateX}px)`;
  }

  // Tambahkan event listener untuk tombol
  const prevButton = document.querySelector(".prev-card");
  const nextButton = document.querySelector(".next-card");

  prevButton.addEventListener("click", () => {
    console.log("Prev clicked"); // Debug
    shiftCards(-1);
  });

  nextButton.addEventListener("click", () => {
    console.log("Next clicked"); // Debug
    shiftCards(1);
  });

  // Debug: Log initial setup
  console.log("Initial setup:", {
    cardsWrapper: cardsWrapper,
    facilityCards: facilityCards.length,
    prevButton: prevButton,
    nextButton: nextButton,
  });
});

let open = document.querySelector("#open");

// open close button
$(document).ready(function () {
  $("#open").click(function () {
    const $opeen = $(".opeen");
    
    if ($opeen.hasClass("open")) {
      $opeen
        .stop(true, true)
        .animate(
          {
            left: "0px",
            opacity: "0",
            height: "0px",
            width: "0px",
          },
          400,
          function() {
            $(this).removeClass("open").addClass("close").css("display", "none"); 
          }
        );
      $(this).html('<i class="bi bi-chevron-right"></i> Buka'); 
    } else {
      $opeen
        .stop(true, true)
        .css("display", "block") 
        .animate(
          {
            left: "450px",
            opacity: "1",
            height: "350px",
            width: "450px",
          },
          400
        );
      $(this).html('<i class="bi bi-chevron-left"></i> Tutup'); 
      $opeen.removeClass("close").addClass("open"); 
    }
  });
});

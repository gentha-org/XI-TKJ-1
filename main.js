// Navbar Active Link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Navbar Scroll Effect with Progress
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    navbar.style.setProperty('--scroll-progress', `${scrollProgress}%`);
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update active link based on scroll position
  const sections = document.querySelectorAll('section');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll with animation duration based on distance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const startPosition = window.scrollY;
    const targetPosition = target.offsetTop;
    const distance = Math.abs(targetPosition - startPosition);
    const duration = Math.min(1000, Math.max(500, distance / 2));
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// Animasi untuk highlight text
const highlights = document.querySelectorAll('.highlight');
highlights.forEach(highlight => {
  highlight.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
    this.style.transition = 'transform 0.3s ease';
  });
  
  highlight.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
  });
});

// Initialize Swiper
const facilitiesSwiper = new Swiper(".facilitiesSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
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
  effect: "creative",
  creativeEffect: {
    prev: {
      translate: ["-120%", 0, -500],
      rotate: [0, 0, -15],
      opacity: 0
    },
    next: {
      translate: ["120%", 0, -500],
      rotate: [0, 0, 15],
      opacity: 0
    }
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Pastikan tombol navigasi selalu aktif
document.querySelector('.nav-prev').style.display = 'flex';
document.querySelector('.nav-next').style.display = 'flex';

// Smooth Scroll with jQuery
$(document).ready(function() {
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    const target = $($(this).attr('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 800, 'swing');
    }
  });
  
  // Navbar Animation
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('navbar-scrolled');
    } else {
      $('.navbar').removeClass('navbar-scrolled');
    }
  });
  
  // Add animation to elements on scroll
  $(window).scroll(function() {
    $('.animate-on-scroll').each(function() {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animate__animated animate__fadeInUp');
      }
    });
  });
});

// Add active state for navigation buttons
const navPrev = document.querySelector('.nav-prev');
const navNext = document.querySelector('.nav-next');

navPrev.addEventListener('click', () => {
  facilitiesSwiper.slidePrev();
});

navNext.addEventListener('click', () => {
  facilitiesSwiper.slideNext();
});

// Add hover animation for facility cards
document.querySelectorAll('.facility-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Data Pengunjung Chart
document.addEventListener('DOMContentLoaded', function() {
  // Data pengunjung (contoh data)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const visitors = [1200, 1350, 1500, 1800, 2100, 2400, 2800, 3000, 2700, 2500, 2300, 2600];
  const onlineTickets = [800, 950, 1100, 1300, 1600, 1900, 2200, 2400, 2100, 1900, 1700, 2000];

  // Konfigurasi tema custom
  const customTheme = {
    font: {
      family: 'Outfit, sans-serif',
      size: 14,
      color: '#475569'
    },
    paper_bgcolor: 'rgba(255,255,255,0)',
    plot_bgcolor: 'rgba(255,255,255,0)',
    colorway: ['#6366f1', '#818cf8']
  };

  // Data untuk grafik
  const trace1 = {
    x: months,
    y: visitors,
    name: 'Total Pengunjung',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      width: 3,
      shape: 'spline'
    },
    marker: {
      size: 8,
      symbol: 'circle'
    }
  };

  const trace2 = {
    x: months,
    y: onlineTickets,
    name: 'Tiket Online',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      width: 3,
      shape: 'spline'
    },
    marker: {
      size: 8,
      symbol: 'circle'
    }
  };

  // Layout konfigurasi
  const layout = {
    title: {
      text: 'Statistik Pengunjung 2023',
      font: {
        size: 24,
        family: 'Space Grotesk, sans-serif',
        color: '#0f172a'
      }
    },
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.2
    },
    margin: {
      l: 50,
      r: 30,
      t: 80,
      b: 80
    },
    xaxis: {
      showgrid: true,
      gridcolor: '#e2e8f0',
      gridwidth: 1,
      tickfont: {
        family: 'Outfit, sans-serif'
      }
    },
    yaxis: {
      showgrid: true,
      gridcolor: '#e2e8f0',
      gridwidth: 1,
      tickfont: {
        family: 'Outfit, sans-serif'
      },
      title: {
        text: 'Jumlah Pengunjung',
        font: {
          family: 'Outfit, sans-serif',
          size: 14
        }
      }
    },
    hovermode: 'x unified',
    hoverlabel: {
      bgcolor: '#fff',
      font: {
        family: 'Outfit, sans-serif'
      },
      bordercolor: '#e2e8f0'
    }
  };

  // Konfigurasi responsif
  const config = {
    responsive: true,
    displayModeBar: false
  };

  // Buat grafik
  Plotly.newPlot('visitorChart', [trace1, trace2], layout, config);

  // Update grafik saat resize window
  window.addEventListener('resize', function() {
    Plotly.relayout('visitorChart', {
      'xaxis.autorange': true,
      'yaxis.autorange': true
    });
  });
});

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
});

// Perbaikan Navbar Active State
function updateNavActiveState() {
  const sections = document.querySelectorAll("section[id]"); // Hanya section dengan ID
  const navLinks = document.querySelectorAll(".nav-link");

  // Dapatkan posisi scroll saat ini dengan offset
  const fromTop = window.scrollY + 150; // Tambah offset untuk trigger point

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const offsetTop = section.offsetTop;
    const height = section.offsetHeight;

    if (fromTop >= offsetTop && fromTop < offsetTop + height) {
      // Hapus active class dari semua link
      navLinks.forEach((link) => link.classList.remove("active"));

      // Tambah active class ke link yang sesuai
      const correspondingLink = document.querySelector(
        `.nav-link[href="#${id}"]`
      );
      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    }
  });

  // Special case untuk home section
  if (window.scrollY < 100) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#home") {
        link.classList.add("active");
      }
    });
  }
}

// Hapus event listener lama
window.removeEventListener("scroll", updateNavActiveState);

// Tambahkan event listener baru dengan throttling
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      updateNavActiveState();
      scrollTimeout = null;
    }, 100); // Throttle 100ms
  }
});

// Panggil saat load dan setelah scrolling selesai
document.addEventListener("DOMContentLoaded", updateNavActiveState);
window.addEventListener("load", updateNavActiveState);

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

// Gallery popup: buka ketika gambar diklik, tutup ketika klik close atau area luar
(function setupGalleryPopup() {
  const galleryImgs = document.querySelectorAll(".img_gallery img");
  const popup = document.getElementById("popupGallery");
  const popupImg = document.getElementById("popupImg");
  const popupClose = document.getElementById("popupClose");

  if (!popup || !popupImg || galleryImgs.length === 0) return;

  galleryImgs.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      popupImg.src = img.src;
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  function closePopup() {
    popup.style.display = "none";
    popupImg.src = "";
    document.body.style.overflow = "";
  }

  popupClose.addEventListener("click", closePopup);

  // close when click outside image
  popup.addEventListener("click", (e) => {
    if (e.target === popup || e.target === popupClose) closePopup();
  });

  // close on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.style.display === "flex") closePopup();
  });
})();

// ================= Tugas CRUD (localStorage) =================
(function tugasModule() {
  const STORAGE_KEY = "tugas_v1";
  let tasks = [];

  // DOM
  const listEl = document.getElementById("tugasList");
  const formEl = document.getElementById("tugasForm");
  const titleEl = document.getElementById("tugasTitle");
  const dueEl = document.getElementById("tugasDue");
  const subjEl = document.getElementById("tugasSubject");
  const descEl = document.getElementById("tugasDesc");
  const editIdEl = document.getElementById("tugasEditId");
  const alertEl = document.getElementById("tugasAlert");
  const collapseEl = document.getElementById("tugasFormCollapse");

  if (!listEl || !formEl) return;

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : [];
    } catch (e) {
      tasks = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function showAlert(msg, timeout = 2500) {
    if (!alertEl) return;
    alertEl.textContent = msg;
    alertEl.classList.remove("d-none");
    setTimeout(() => {
      alertEl.classList.add("d-none");
    }, timeout);
  }

  function render() {
    listEl.innerHTML = "";
    if (tasks.length === 0) {
      listEl.innerHTML = '<div class="list-group-item small text-muted">Belum ada tugas.</div>';
      return;
    }

    // newest first
    tasks.slice().reverse().forEach((t) => {
      const dueText = t.due ? `<div class="small text-muted">Tenggat: ${t.due}</div>` : "";
      const subjectText = t.subject ? `<div class="fw-semibold small">${escapeHtml(t.subject)}</div>` : "";
      const descText = t.description ? `<div class="mt-1">${escapeHtml(t.description)}</div>` : "";

      const item = document.createElement("div");
      item.className = "list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start gap-2";
      item.innerHTML = `
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="fw-bold">${escapeHtml(t.title)}</div>
              ${subjectText}
              ${dueText}
            </div>
            <div class="ms-3 text-end">
              <button class="btn btn-sm btn-outline-secondary btn-edit" data-id="${t.id}" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${t.id}" title="Hapus"><i class="bi bi-trash"></i></button>
            </div>
          </div>
          ${descText}
        </div>
      `;
      listEl.appendChild(item);
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function resetForm() {
    formEl.reset();
    editIdEl.value = "";
  }

  // add / update
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleEl.value.trim();
    const subject = subjEl.value.trim();
    const desc = descEl.value.trim();
    const due = dueEl.value || "";

    if (!title) {
      showAlert("Isi judul tugas terlebih dahulu.");
      return;
    }

    const existingId = editIdEl.value;
    if (existingId) {
      // update
      const idx = tasks.findIndex((x) => x.id === existingId);
      if (idx !== -1) {
        tasks[idx].title = title;
        tasks[idx].subject = subject;
        tasks[idx].description = desc;
        tasks[idx].due = due;
        save();
        render();
        showAlert("Tugas diperbarui.");
      }
    } else {
      // create
      const entry = {
        id: uid(),
        title,
        subject,
        description: desc,
        due,
        createdAt: Date.now(),
      };
      tasks.push(entry);
      save();
      render();
      showAlert("Tugas ditambahkan.");
    }

    // close collapse on submit (bootstrap)
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
    bsCollapse.hide();

    resetForm();
  });

  // click handlers (edit / delete) - event delegation
  listEl.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".btn-edit");
    if (editBtn) {
      const id = editBtn.getAttribute("data-id");
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      titleEl.value = task.title || "";
      subjEl.value = task.subject || "";
      descEl.value = task.description || "";
      dueEl.value = task.due || "";
      editIdEl.value = task.id;
      // open collapse
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
      bsCollapse.show();
      return;
    }

    const delBtn = e.target.closest(".btn-delete");
    if (delBtn) {
      const id = delBtn.getAttribute("data-id");
      if (!confirm("Hapus tugas ini?")) return;
      tasks = tasks.filter((t) => t.id !== id);
      save();
      render();
      showAlert("Tugas dihapus.");
      return;
    }
  });

  // cancel button -> reset form
  const cancelBtn = document.getElementById("tugasCancelBtn");
  cancelBtn?.addEventListener("click", () => {
    resetForm();
  });

  // init
  function init() {
    load();
    render();
  }

  // expose init on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", init);
})();

// ================= Contact form -> komentar (localStorage) =================
(function contactModule() {
  const STORAGE_KEY = "contact_messages_v1";
  let messages = [];

  const form = document.getElementById("contactForm");
  const listEl = document.getElementById("messagesList");
  const countEl = document.getElementById("messagesCount");
  const clearBtn = document.getElementById("clearMessagesBtn");
  const alertBox = document.getElementById("contactSuccessAlert");
  const alertText = document.getElementById("contactSuccessText");

  if (!form || !listEl) return;

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      messages = raw ? JSON.parse(raw) : [];
    } catch (e) {
      messages = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escapeHtml(str = "") {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function render() {
    listEl.innerHTML = "";
    if (!messages.length) {
      listEl.innerHTML = '<div class="text-muted small">Belum ada komentar.</div>';
      countEl.textContent = "0";
      clearBtn?.classList.add("d-none");
      return;
    }

    countEl.textContent = String(messages.length);
    clearBtn?.classList.remove("d-none");

    // newest first
    messages.slice().reverse().forEach((m) => {
      const item = document.createElement("div");
      item.className = "message-item";
      item.innerHTML = `
        <div class="flex-shrink-0">
          <div class="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;">
            ${escapeHtml((m.name || "Anon").slice(0,1)).toUpperCase()}
          </div>
        </div>
        <div class="flex-grow-1">
          <div class="d-flex align-items-start gap-2">
            <div>
              <div class="fw-semibold">${escapeHtml(m.name || "Anonim")}</div>
              <div class="message-meta">${escapeHtml(m.subject || "")} • ${new Date(m.time).toLocaleString()}</div>
            </div>
            <button class="btn btn-sm btn-outline-danger btn-delete-msg" data-id="${m.id}" title="Hapus">×</button>
          </div>
          <div class="mt-2 message-body">${escapeHtml(m.message)}</div>
        </div>
      `;
      listEl.appendChild(item);
    });
  }

  function showCenteredAlert(msg, sub = "", duration = 2200) {
    if (!alertBox) return;
    alertText.textContent = sub || "";
    alertBox.querySelector(".alert-content > strong").textContent = msg;
    alertBox.classList.remove("d-none");
    // trigger show class for small pop animation
    setTimeout(() => alertBox.classList.add("show"), 20);
    setTimeout(() => {
      alertBox.classList.remove("show");
      setTimeout(() => alertBox.classList.add("d-none"), 220);
    }, duration);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!message) {
      showCenteredAlert("Isi pesan terlebih dahulu.", "");
      return;
    }

    const entry = {
      id: uid(),
      name: name || "Anonim",
      subject: subject || "",
      message,
      time: Date.now(),
    };

    messages.push(entry);
    save();
    render();

    // show alert in center
    showCenteredAlert("Pesan terkirim", "Terima kasih — pesan disimpan.");

    form.reset();
  });

  // delegation: delete single message
  listEl.addEventListener("click", (e) => {
    const del = e.target.closest(".btn-delete-msg");
    if (!del) return;
    const id = del.getAttribute("data-id");
    if (!id) return;
    if (!confirm("Hapus pesan ini?")) return;
    messages = messages.filter((m) => m.id !== id);
    save();
    render();
  });

  // clear all
  clearBtn?.addEventListener("click", () => {
    if (!confirm("Hapus semua pesan?")) return;
    messages = [];
    save();
    render();
  });

  // init
  document.addEventListener("DOMContentLoaded", () => {
    load();
    render();
  });
})();



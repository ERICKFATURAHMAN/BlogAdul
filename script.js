/**
 * 1. AUTO-SLIDE CAROUSEL UNTUK FOTO HERO POLAROID UTAMA
 */
let currentHeroSlide = 0;
let heroSlideInterval = null;
const SLIDE_DELAY_MS = 3500;

function showHeroSlide(index) {
  const slides = document.querySelectorAll('#heroSlider .hero-slide');
  const dots = document.querySelectorAll('#heroSliderDots .dot');
  if (!slides.length) return;

  if (index >= slides.length) {
    currentHeroSlide = 0;
  } else if (index < 0) {
    currentHeroSlide = slides.length - 1;
  } else {
    currentHeroSlide = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentHeroSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });
}

function goToHeroSlide(index) {
  showHeroSlide(index);
  resetHeroSlideTimer();
}

function startHeroSlideTimer() {
  heroSlideInterval = setInterval(() => {
    showHeroSlide(currentHeroSlide + 1);
  }, SLIDE_DELAY_MS);
}

function resetHeroSlideTimer() {
  clearInterval(heroSlideInterval);
  startHeroSlideTimer();
}

/**
 * 2. FILTER KATEGORI SKILL (TRAIL RUN VS TECH)
 */
function filterSkill(category, clickedButton) {
  const allButtons = document.querySelectorAll('.ed-filter-tabs .tab-btn');
  allButtons.forEach((btn) => btn.classList.remove('active'));
  clickedButton.classList.add('active');

  const skillItems = document.querySelectorAll('#skillGrid .soft-item');
  skillItems.forEach((item) => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  const videoBanner = document.getElementById('skillVideoBanner');
  if (videoBanner) {
    videoBanner.style.display = (category === 'all') ? 'flex' : 'none';
  }
}

/**
 * 3. FILTER REKOR 25 PODIUM ABDUL ROHMAN
 */
function filterPodium(filterType, clickedBtn) {
  const allTabs = document.querySelectorAll('.podium-filter-bar .podium-tab');
  allTabs.forEach((btn) => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  const podiumItems = document.querySelectorAll('#podiumWall .podium-item');
  podiumItems.forEach((item) => {
    const rank = item.getAttribute('data-rank');
    const dist = item.getAttribute('data-dist');

    if (filterType === 'all') {
      item.style.display = 'flex';
    } else if (filterType === 'juara1' && rank === 'juara1') {
      item.style.display = 'flex';
    } else if (filterType === 'ultra' && dist === 'ultra') {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * 4. MODAL VIDEO VIEWER (PERSIS KODE SCRIPT.JS BLOG ASLI)
 */
const skillVideos = [
  {
    title: "02. Skill Video 1: Uphill Power Hiking & Tanjakan Ekstrem",
    url: "https://drive.google.com/file/d/1u3KKAh2p1ECkXowxmDjBheP-yZtqf9JQ/preview",
    narrative: "Dokumentasi teknik Abdul Rohman saat menaklukkan tanjakan curam dan elevasi ekstrem di jalur pegunungan. Menunjukkan efisiensi langkah, ritme pernapasan teratur, serta manajemen detak jantung (heart rate) agar stamina tetap stabil hingga puncak."
  },
  {
    title: "02. Skill Video 2: Agility & Technical Downhill Pace",
    url: "https://drive.google.com/file/d/1nwyrRQUsB_hY51g_tDP4UWmmTx7_9GbS/preview",
    narrative: "Aksi lari menuruni bukit (technical downhill) dengan kecepatan tinggi melintasi rute berbatu, tanah licin, dan akar pohon. Memperlihatkan kelincahan refleks, pemilihan titik pijakan kaki yang presisi, serta keseimbangan tubuh di bawah tekanan medan berbahaya."
  },
  {
    title: "02. Skill Video 3: Ultra Endurance & Single-Track Pacing",
    url: "https://drive.google.com/file/d/1lORCfUhjesTFq5cySShR8pLBnrUhbM3R/preview",
    narrative: "Cuplikan konsistensi ritme lari jarak jauh (ultra pacing) Abdul Rohman di jalur single-track hutan pegunungan. Membuktikan daya tahan fisik prima, konsentrasi mental tanpa henti, serta eksekusi strategi kecepatan yang membawanya meraih 25 podium kejuaraan nasional."
  }
];

let currentModalVideoIndex = 0;
let isSkillGalleryMode = false;

function openSkillVideoGallery() {
  isSkillGalleryMode = true;
  currentModalVideoIndex = 0;
  renderModalVideo();

  const navBar = document.getElementById('modalVideoNavBar');
  if (navBar) navBar.style.display = 'flex';

  document.getElementById('videoModal').classList.add('active');
}

function renderModalVideo() {
  const current = skillVideos[currentModalVideoIndex];
  const titleEl = document.getElementById('modalTitle');
  const driveFrame = document.getElementById('modalDriveFrame');
  const narrativeEl = document.getElementById('modalNarrativeText');
  const counterPill = document.getElementById('videoCounterPill');

  titleEl.textContent = current.title;
  narrativeEl.textContent = current.narrative;
  driveFrame.src = current.url;

  if (counterPill) {
    counterPill.textContent = `Video ${currentModalVideoIndex + 1} dari ${skillVideos.length}`;
  }
}

function nextModalVideo() {
  if (!isSkillGalleryMode) return;
  currentModalVideoIndex = (currentModalVideoIndex + 1) % skillVideos.length;
  renderModalVideo();
}

function prevModalVideo() {
  if (!isSkillGalleryMode) return;
  currentModalVideoIndex = (currentModalVideoIndex - 1 + skillVideos.length) % skillVideos.length;
  renderModalVideo();
}

function openSingleVideoModal(title, videoSrc, narrativeText) {
  isSkillGalleryMode = false;
  const modal = document.getElementById('videoModal');
  const titleEl = document.getElementById('modalTitle');
  const driveFrame = document.getElementById('modalDriveFrame');
  const narrativeEl = document.getElementById('modalNarrativeText');
  const navBar = document.getElementById('modalVideoNavBar');

  titleEl.textContent = title;
  narrativeEl.textContent = narrativeText;
  driveFrame.src = videoSrc;

  if (navBar) navBar.style.display = 'none';
  modal.classList.add('active');
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const driveFrame = document.getElementById('modalDriveFrame');

  if (driveFrame) driveFrame.src = '';
  if (modal) modal.classList.remove('active');
}

function closeModalOnBg(event) {
  if (event.target.id === 'videoModal') {
    closeVideoModal();
  }
}

/**
 * 5. MODAL LIGHTBOX VIEWER FOTO SERTIFIKAT KEJUARAAN
 */
function openImageModal(title, imageSrc) {
  const modal = document.getElementById('imageModal');
  const titleEl = document.getElementById('imageModalTitle');
  const imgEl = document.getElementById('imageViewerImg');
  const directLink = document.getElementById('imageDirectLink');

  if (!modal || !titleEl || !imgEl) return;

  titleEl.textContent = title;
  imgEl.src = imageSrc;
  if (directLink) directLink.href = imageSrc;

  modal.classList.add('active');
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  const imgEl = document.getElementById('imageViewerImg');

  if (imgEl) imgEl.src = '';
  if (modal) modal.classList.remove('active');
}

function closeImageModalOnBg(event) {
  if (event.target.id === 'imageModal') {
    closeImageModal();
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeVideoModal();
    closeImageModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  startHeroSlideTimer();

  const sliderBox = document.getElementById('heroSlider');
  if (sliderBox) {
    sliderBox.addEventListener('mouseenter', () => clearInterval(heroSlideInterval));
    sliderBox.addEventListener('mouseleave', () => startHeroSlideTimer());
  }
});
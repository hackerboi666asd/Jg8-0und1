// ============================================================
// CYBER::ADVENTURES — Scene Engine
// ============================================================

import { state } from './state.js';
import { dialog } from './dialog.js';

// Lazy-load scene modules
const SCENES = {
  s00_intro:  () => import('./scenes/s00_intro.js'),
  s01_bits:   () => import('./scenes/s01_bits.js'),
  s02_turing: () => import('./scenes/s02_turing.js'),
  s03_server: () => import('./scenes/s03_server.js'),
  s04_pixel:  () => import('./scenes/s04_pixel.js'),
  s05_halt:   () => import('./scenes/s05_halt.js'),
  s06_ki:     () => import('./scenes/s06_ki.js'),
  s07_krypto: () => import('./scenes/s07_krypto.js'),
  s08_finale: () => import('./scenes/s08_finale.js'),
};

const CHAPTER_NAMES = {
  s00_intro:  'KAPITEL 0 — KIMS ZIMMER',
  s01_bits:   'KAPITEL 1 — BITS & BYTES',
  s02_turing: 'KAPITEL 2 — DIE TURING-MASCHINE',
  s03_server: 'KAPITEL 3 — DER SERVERRAUM',
  s04_pixel:  'KAPITEL 4 — DER BACKUP-DRIVE',
  s05_halt:   'KAPITEL 5 — PARASIT.EXE',
  s06_ki:     'KAPITEL 6 — KI-LABOR',
  s07_krypto: 'KAPITEL 7 — BYTES VERSTECK',
  s08_finale: 'KAPITEL 8 — FINALES PROTOKOLL',
};

const container   = document.getElementById('scene-container');
const chapterLbl  = document.getElementById('chapter-label');
const overlay     = document.getElementById('transition-overlay');
const tooltip     = document.getElementById('hotspot-tooltip');
const puzzlePanel = document.getElementById('puzzle-overlay');
const puzzleBox   = document.getElementById('puzzle-content');
const puzzleClose = document.getElementById('puzzle-close');
const notifEl     = document.getElementById('notification');

let activeScene = null;
let notifTimer  = null;
let activeItem  = null;     // selected inventory item

export const engine = {

  init() {
    puzzleClose.addEventListener('click', () => this.closePuzzle());
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closePuzzle();
    });

    // Mouse tracking for tooltip
    document.addEventListener('mousemove', e => {
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top  = (e.clientY - 10) + 'px';
    });
  },

  async loadScene(id) {
    state.currentScene = id;
    state.save();

    // Fade out
    overlay.classList.add('active');
    await wait(500);

    // Clear previous scene
    dialog.hide();
    container.innerHTML = '';
    container.className = '';
    activeScene = null;

    // Update chapter label
    chapterLbl.textContent = CHAPTER_NAMES[id] || id;

    // Load + build new scene
    const mod = await SCENES[id]();
    activeScene = mod;
    mod.build(container, this);

    // Fade in
    await wait(80);
    overlay.classList.remove('active');
    await wait(500);

    // Scene entry dialog
    if (mod.onEnter) mod.onEnter(this);
  },

  // ---- Hotspot helpers ----

  addHotspot(el, label, callback, requireItem = null) {
    el.classList.add('hotspot');

    const glow = document.createElement('div');
    glow.className = 'hs-glow';
    el.appendChild(glow);

    const hsLabel = document.createElement('div');
    hsLabel.className = 'hs-label';
    hsLabel.textContent = '▶ ' + label;
    el.appendChild(hsLabel);

    el.addEventListener('mouseenter', () => {
      tooltip.style.display = 'none';
    });
    el.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    el.addEventListener('click', () => {
      tooltip.style.display = 'none';
      if (requireItem && activeItem !== requireItem) {
        dialog.show('kim', `Ich brauche dafür wohl ${requireItem === requireItem ? 'das richtige Item' : requireItem}.`, []);
        return;
      }
      callback();
    });
  },

  setActiveItem(id) { activeItem = id; },
  getActiveItem()   { return activeItem; },
  clearActiveItem() { activeItem = null; },

  // ---- Puzzle overlay ----

  openPuzzle(buildFn) {
    puzzleBox.innerHTML = '';
    buildFn(puzzleBox);
    puzzlePanel.classList.remove('hidden');
  },

  closePuzzle() {
    puzzlePanel.classList.add('hidden');
    puzzleBox.innerHTML = '';
  },

  // ---- Notification ----

  notify(text, duration = 4000) {
    notifEl.textContent = text;
    notifEl.classList.remove('hidden');
    notifEl.classList.add('visible');
    clearTimeout(notifTimer);
    notifTimer = setTimeout(() => {
      notifEl.classList.remove('visible');
      setTimeout(() => notifEl.classList.add('hidden'), 400);
    }, duration);
  },
};

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ============================================================
// CYBER::ADVENTURES — Inventory System
// ============================================================

import { state } from './state.js';
import { engine } from './engine.js';

const slotsEl    = document.getElementById('inventory-slots');
const tooltipEl  = document.getElementById('inventory-tooltip');

// Item registry
const ITEMS = {
  'visitenkarte_byte':  { icon: '💾', label: 'BYTEs Visitenkarte', desc: 'Eine Visitenkarte in Binary. Jemand macht gerne Theater.' },
  'turing_protokoll':   { icon: '📄', label: 'Turing-Protokoll',    desc: 'Ein Turing-Maschinen-Skript. Handschriftlich, chaotisch.' },
  'schicht_diagram':    { icon: '🗂️', label: 'Schicht-Diagramm',    desc: 'Ein zerknittertes Diagramm der Softwareschichten.' },
  'korrupte_datei':     { icon: '🗃️', label: 'Korrupte Datei',      desc: 'PETEs Backup, stark beschädigt. Benötigt Reparatur.' },
  'paradox_notiz':      { icon: '🔁', label: 'Paradox-Notiz',       desc: 'BYTEs Notiz: "Dieses Programm stoppt genau dann, wenn es nicht stoppt."' },
  'deepfake_screenshoot':{ icon: '🖼️', label: 'Deepfake-Screenshot',desc: 'KI-Bild von BYTE — 7 Finger, 2 Nasen. Klassisch.' },
  'geheimbrief':        { icon: '✉️', label: 'Verschlüsselter Brief',desc: 'Alles nur Kauderwelsch. Oder doch Caesar?' },
  'passwort_zettel':    { icon: '📋', label: 'Passwort-Zettel',     desc: 'PETEs Passwort auf Post-It. Erschreckend.' },
};

const slots = new Map(); // itemId → DOM element

export const inventory = {

  init() {
    slotsEl.innerHTML = '';
    slots.clear();
  },

  restoreFromState() {
    for (const id of state.inventoryItems) {
      this._renderSlot(id);
    }
  },

  addItem(id) {
    if (state.inventoryItems.has(id)) return false;
    state.inventoryItems.add(id);
    state.save();
    this._renderSlot(id);
    return true;
  },

  hasItem(id) {
    return state.inventoryItems.has(id);
  },

  _renderSlot(id) {
    const def = ITEMS[id];
    if (!def) { console.warn('Unknown item:', id); return; }

    const slot = document.createElement('div');
    slot.className = 'inv-slot';
    slot.textContent = def.icon;
    slot.title = def.label;
    slot.dataset.id = id;

    slot.addEventListener('mouseenter', (e) => {
      tooltipEl.textContent = def.label + ' — ' + def.desc;
      tooltipEl.style.display = 'block';
      tooltipEl.style.left = (slot.getBoundingClientRect().left) + 'px';
    });
    slot.addEventListener('mouseleave', () => {
      tooltipEl.style.display = 'none';
    });
    slot.addEventListener('click', () => {
      if (slot.classList.contains('active')) {
        slot.classList.remove('active');
        engine.clearActiveItem();
      } else {
        document.querySelectorAll('.inv-slot.active').forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
        engine.setActiveItem(id);
      }
    });

    slotsEl.appendChild(slot);
    slots.set(id, slot);
  },
};

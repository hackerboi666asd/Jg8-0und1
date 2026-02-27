// ============================================================
// CYBER::ADVENTURES — Dialog System (Monkey Island style)
// ============================================================

const panel       = document.getElementById('dialog-panel');
const portraitEl  = document.getElementById('portrait-char');
const nameEl      = document.getElementById('portrait-name');
const textEl      = document.getElementById('dialog-text');
const choicesEl   = document.getElementById('dialog-choices');
const continueEl  = document.getElementById('dialog-continue');

// Character definitions
const CHARS = {
  kim: {
    name: 'KIM',
    color: 'var(--neon-blue)',
    css: 'char-kim',
    shape: 'humanoid',
  },
  byte: {
    name: 'BYTE',
    color: 'var(--neon-pink)',
    css: 'char-byte',
    shape: 'humanoid',
  },
  justus: {
    name: 'JUSTUS',
    color: 'var(--neon-yellow)',
    css: 'char-justus',
    shape: 'humanoid',
  },
  brandt: {
    name: 'HR. BRANDT',
    color: 'var(--neon-purple)',
    css: 'char-brandt',
    shape: 'humanoid',
  },
  aria: {
    name: 'ARIA-7',
    color: 'var(--neon-cyan)',
    css: 'char-aria',
    shape: 'humanoid',
  },
  pete: {
    name: 'PIXEL_PETE',
    color: 'var(--neon-green)',
    css: 'char-pete',
    shape: 'humanoid',
  },
  system: {
    name: 'SYSTEM',
    color: 'var(--text-dim)',
    css: '',
    shape: 'system',
  },
};

let typingTimer = null;
let queue = [];       // [{charId, text, choices, after}]
let isTyping = false;
let fullText = '';

export const dialog = {

  // ---- Public API ----

  /**
   * Show a dialog line.
   * @param {string} charId
   * @param {string} text
   * @param {Array<{label:string, action:function}>} choices — empty = show CONTINUE
   * @param {function} [after] — called after choices or continue is clicked
   */
  show(charId, text, choices = [], after = null) {
    queue.push({ charId, text, choices, after });
    if (!isTyping) this._next();
  },

  /**
   * Chain multiple dialog lines. The last entry may have choices.
   * @param {Array<{char, text, choices, after}>} lines
   */
  sequence(lines) {
    // Build a chain: each line's `after` leads to the next
    const built = lines.map((l, i) => ({
      charId:  l.char,
      text:    l.text,
      choices: i === lines.length - 1 ? (l.choices || []) : [],
      after:   i < lines.length - 1
                 ? () => this._playLine(built[i + 1])
                 : (l.after || null),
    }));
    if (built.length) {
      queue = [];
      isTyping = false;
      this._playLine(built[0]);
    }
  },

  hide() {
    panel.classList.add('hidden');
    clearTimeout(typingTimer);
    queue = [];
    isTyping = false;
  },

  // ---- Internal ----

  _next() {
    if (!queue.length) return;
    this._playLine(queue.shift());
  },

  _playLine({ charId, text, choices, after }) {
    // Safety: if there's no text, just call after() directly
    if (!text) {
      isTyping = false;
      if (after) after();
      else this._next();
      return;
    }
    isTyping = true;
    const char = CHARS[charId] || CHARS.system;

    // Portrait
    portraitEl.innerHTML = renderPortrait(char);
    nameEl.textContent   = char.name;
    nameEl.style.color   = char.color;

    // Panel
    panel.classList.remove('hidden');
    textEl.textContent = '';
    choicesEl.innerHTML = '';
    continueEl.classList.add('hidden');

    // Typing animation
    fullText = text;
    let i = 0;
    clearTimeout(typingTimer);

    const TYPE_SPEED = 22; // ms per char

    const type = () => {
      if (i < fullText.length) {
        textEl.textContent += fullText[i++];
        typingTimer = setTimeout(type, TYPE_SPEED);
      } else {
        isTyping = false;
        _showChoicesOrContinue(choices, after, this);
      }
    };

    type();
  },
};

function _showChoicesOrContinue(choices, after, dlg) {
  choicesEl.innerHTML = '';
  continueEl.classList.add('hidden');

  if (choices && choices.length > 0) {
    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = '▸ ' + c.label;
      btn.addEventListener('click', () => {
        choicesEl.innerHTML = '';
        continueEl.classList.add('hidden');
        if (c.action) c.action();
      });
      choicesEl.appendChild(btn);
    });
  } else {
    continueEl.classList.remove('hidden');
    let done = false;
    const proceed = () => {
      if (done) return;
      done = true;
      continueEl.classList.add('hidden');
      panel.removeEventListener('click', proceed);
      continueEl.removeEventListener('click', proceed);
      if (after) after();
      else dlg._next();
    };
    continueEl.addEventListener('click', proceed);
    panel.addEventListener('click', proceed);
  }
}

function renderPortrait(char) {
  if (char.shape === 'system') {
    return `<div style="font-size:2rem;text-align:center;padding-top:1rem;color:var(--text-dim);">⌨</div>`;
  }
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;padding-bottom:4px;">
      <div class="char-head ${char.css.replace('char-','char-head-')} ${char.css}"
           style="width:44px;height:44px;border-radius:50%;border:2px solid ${char.color};
                  background:rgba(0,20,40,0.8);box-shadow:0 0 10px ${char.color}66;">
      </div>
      <div class="char-body"
           style="width:36px;height:44px;border:2px solid ${char.color};border-top:none;
                  border-radius:0 0 6px 6px;background:rgba(0,20,40,0.6);">
      </div>
      <div style="display:flex;gap:4px;">
        <div style="width:12px;height:26px;border:2px solid ${char.color};border-top:none;
                    border-radius:0 0 4px 4px;background:rgba(0,20,40,0.5);"></div>
        <div style="width:12px;height:26px;border:2px solid ${char.color};border-top:none;
                    border-radius:0 0 4px 4px;background:rgba(0,20,40,0.5);"></div>
      </div>
    </div>
  `;
}

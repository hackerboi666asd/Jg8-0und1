// ============================================================
// S06 — KI-LABOR (KI & Bias)
// ============================================================

import { dialog }    from '../dialog.js';
import { state }     from '../state.js';
import { inventory } from '../inventory.js';
import { el, makeFigure, makeFloor } from '../helpers.js';

export function build(container, engine) {
  container.className = 'bg-ki-lab';
  container.style.cssText += 'width:100%;height:100%;position:relative;overflow:hidden;';
  makeFloor(container);

  // ---- Lab equipment background ----
  for (let i = 0; i < 3; i++) {
    const panel = el('div', {
      left: (5 + i * 30) + '%', top: '8%', width: '24%', height: '40%',
      background: 'rgba(30,0,40,0.5)',
      border: '1px solid rgba(204,102,255,0.2)',
      borderRadius: '4px',
    });
    panel.innerHTML = `<div style="padding:0.4rem;font-family:'Share Tech Mono',monospace;
      font-size:0.5rem;color:rgba(204,102,255,0.5);line-height:1.6;">
      NEURAL NET ${i+1}<br>
      ${Array.from({length:12},()=>Math.random()>0.7?'██':'░░').join(' ')}<br>
      LOSS: ${(0.1+Math.random()*0.5).toFixed(3)}<br>
      ACC:  ${(60+Math.random()*35).toFixed(1)}%
    </div>`;
    container.appendChild(panel);
  }

  // ---- Big "BYTE's DEEPFAKES" gallery ----
  const gallery = el('div', {
    left: '15%', bottom: '15%', width: '65%', height: '40%',
    background: 'rgba(10,0,20,0.9)',
    border: '2px solid var(--neon-purple)',
    borderRadius: '4px',
    boxShadow: '0 0 20px rgba(204,102,255,0.3)',
    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    padding: '0.8rem',
    cursor: 'pointer',
    overflow: 'hidden',
  });
  gallery.innerHTML = `
    <div style="text-align:center;flex:1;">
      <div style="font-family:'Orbitron',sans-serif;font-size:0.65rem;color:var(--neon-purple);margin-bottom:0.4rem;">
        KI-GENERIERTE BILDER
      </div>
      <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;">
        ${['😈 7 Finger?', '🤖 3 Augen!', '🦊 2 Nasen!'].map(l => `
          <div style="width:clamp(50px,10vw,80px);height:clamp(50px,10vw,80px);
                      background:rgba(40,0,60,0.6);border:1px solid rgba(204,102,255,0.4);
                      border-radius:4px;display:flex;align-items:center;justify-content:center;
                      flex-direction:column;font-size:0.7rem;text-align:center;
                      color:var(--text-dim);gap:2px;">
            ${l}
          </div>
        `).join('')}
      </div>
      <div style="font-family:'Share Tech Mono',monospace;font-size:0.55rem;
                  color:var(--text-dim);margin-top:0.4rem;">[KLICK → ANALYSIEREN]</div>
    </div>
  `;
  container.appendChild(gallery);

  // ---- Info terminal ----
  const infoTerm = el('div', {
    left: '2%', bottom: '15%', width: '12%', height: '35%',
    background: 'rgba(5,0,10,0.95)',
    border: '1px solid rgba(204,102,255,0.3)',
    borderRadius: '3px',
    padding: '0.4rem',
    cursor: 'pointer',
  });
  infoTerm.innerHTML = `<div style="font-family:'Share Tech Mono',monospace;font-size:0.5rem;
    color:rgba(204,102,255,0.7);line-height:1.7;">
    KI-FAKTEN:<br>
    ▸ KI lernt aus Daten<br>
    ▸ Schlechte Daten →<br>  schlechte KI<br>
    ▸ KI erfindet Fakten (Halluzinieren)<br>
    ▸ Bias = Lernverzerrung durch einseitige Daten<br>
    <span style="color:#556677;">[KLICK]</span>
  </div>`;
  container.appendChild(infoTerm);

  container.appendChild(makeFigure('kim',  { left: '5%',  bottom: '15%' }));
  container.appendChild(makeFigure('justus',{ left: '15%', bottom: '15%'}));

  // BYTE appears as hologram here
  const byteHolo = el('div', {
    right: '5%', bottom: '15%',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
  });
  byteHolo.innerHTML = `
    <div style="width:30px;height:30px;border-radius:50%;border:2px solid var(--neon-pink);
                background:rgba(40,0,15,0.8);box-shadow:0 0 12px var(--neon-pink);
                animation:flicker 3s infinite;"></div>
    <div style="width:24px;height:30px;border:2px solid var(--neon-pink);border-top:none;
                border-radius:0 0 5px 5px;background:rgba(30,0,10,0.6);
                animation:flicker 3s infinite;opacity:0.7;"></div>
    <div style="display:flex;gap:3px;">
      <div style="width:7px;height:16px;border:2px solid var(--neon-pink);border-top:none;
                  border-radius:0 0 3px 3px;background:rgba(30,0,10,0.5);"></div>
      <div style="width:7px;height:16px;border:2px solid var(--neon-pink);border-top:none;
                  border-radius:0 0 3px 3px;background:rgba(30,0,10,0.5);"></div>
    </div>
    <div style="font-family:'Orbitron',sans-serif;font-size:0.5rem;color:var(--neon-pink);
                text-shadow:0 0 4px var(--neon-pink);animation:flicker 4s infinite;">BYTE [HOLO]</div>
  `;
  container.appendChild(byteHolo);

  // ---- Hotspots ----
  engine.addHotspot(gallery, 'Deepfakes analysieren', () => {
    if (state.isPuzzleSolved('s06_ki')) {
      dialog.show('kim', 'Die KI-Bilder sind eindeutig gefälscht. BYTE kann keinen realen Ort nachweisen — seine "Alibis" sind erfunden (halluziniert).');
      return;
    }
    engine.openPuzzle(buildKiPuzzle(engine));
  });

  engine.addHotspot(infoTerm, 'KI-Info-Terminal lesen', () => {
    dialog.show('brandt', 'KI-Systeme lernen aus Trainingsdaten. Sind diese Daten einseitig — zum Beispiel überwiegend von einer Gruppe — dann lernt die KI diese Lernverzerrung mit. Das nennt man Bias. Eine KI, die nur Programmier-Foren kennt, denkt vielleicht, alle Informatiker sind männlich. Außerdem: KI erfindet manchmal Fakten, die plausibel klingen aber falsch sind — das nennt man Halluzinieren.');
  });

  engine.addHotspot(byteHolo, 'BYTE-Hologramm ansprechen', () => {
    dialog.sequence([
      { char: 'byte', text: 'HA! Ihr denkt ihr könnt mich finden? Schaut euch an — das bin ich auf jedem Kontinent gleichzeitig!' },
      { char: 'kim', text: '...BYTE, auf dem dritten Foto hast du sieben Finger.' },
      { char: 'byte', text: 'Das sind meine... Bonus-Finger. Für produktiveres Tippen.' },
      { char: 'justus', text: 'Und auf dem zweiten hast du drei Augen.' },
      { char: 'byte', text: 'Bye. [VERBINDUNG GETRENNT]' },
    ]);
  });
}

export function onEnter(engine) {
  dialog.sequence([
    { char: 'system', text: '— Privates KI-Forschungslabor. Überall Neural-Net-Visualisierungen und lila Neonlicht. —' },
    { char: 'byte', text: 'Oh, ihr seid gekommen! Willkommen in meinem geheimen Hauptquartier! Seht her — ich bin überall! Meine KI hat 1000 Fotos von mir auf der ganzen Welt generiert!' },
    { char: 'kim', text: 'BYTE. Wir können dich auf diesem Hologramm sehen. Du bist nicht auf der ganzen Welt.' },
    { char: 'byte', text: 'Moment — ich führe jetzt einen Qualitäts-Check durch...' },
    { char: 'justus', text: 'Er hat auf einem Bild zwei Nasen.' },
    { char: 'byte', text: 'Das ist... ein Feature.' },
  ]);
}

function buildKiPuzzle(engine) {
  const questions = [
    {
      q: 'BYTE behauptet: "Meine KI hat beweisend festgestellt, dass ich unschuldig bin." Ist das glaubwürdig?',
      opts: [
        { label: 'Ja — KI lügt nie.', wrong: 'KI-Systeme können falsche Fakten erfinden (halluzinieren) — das klingt plausibel, ist aber trotzdem falsch.' },
        { label: 'Nein — KI kann falsche Fakten erfinden (Halluzinieren).', correct: true, msg: 'Genau! KI-Systeme sind keine neutralen Beweismittel.' },
        { label: 'Ja — wenn man genug GPU hat.', wrong: 'GPU-Leistung ändert nichts an der Zuverlässigkeit von Ausgaben.' },
      ]
    },
    {
      q: 'BYTEs KI hat ausschließlich aus seinen eigenen Social-Media-Posts gelernt. Welches Problem entsteht?',
      opts: [
        { label: 'Die KI ist zu gut.', wrong: 'Zu viel eigene Daten führen nicht zu besseren Ergebnissen, sondern zu Bias.' },
        { label: 'Die KI hat Bias (= Lernverzerrung) — sie kennt nur BYTEs Weltsicht.', correct: true, msg: 'Richtig! Einseitige Trainingsdaten erzeugen verzerrte Modelle.' },
        { label: 'Keine Probleme — mehr Daten sind immer besser.', wrong: 'Mehr Daten helfen nur, wenn sie vielfältig und repräsentativ sind.' },
      ]
    },
    {
      q: 'Ein KI-Bild zeigt BYTE an 10 verschiedenen Orten gleichzeitig. Wie wertvoll ist das als Alibi?',
      opts: [
        { label: 'Sehr wertvoll — KI macht keine Fehler.', wrong: 'Generative KI erfindet Bilder basierend auf Wahrscheinlichkeiten — kein Foto-Beweis.' },
        { label: 'Nicht wertvoll — KI-generierte Bilder sind kein Beweis für reale Anwesenheit.', correct: true, msg: 'Genau! Generierte Bilder belegen keine physische Existenz an einem Ort.' },
        { label: 'Vielleicht — kommt auf die Auflösung an.', wrong: 'Auflösung ändert nichts an der grundsätzlichen Unzuverlässigkeit als Beweis.' },
      ]
    },
  ];

  return (box) => {
    let step = 0, score = 0;

    const render = () => {
      if (step >= questions.length) {
        if (score >= 2) {
          box.querySelector('#ki-q').innerHTML = `
            <div class="puzzle-feedback ok" style="font-size:0.95rem;">
              ✓ ${score}/3 korrekt! KI kann sehr nützlich sein — aber sie kann Fakten erfinden (halluzinieren),
              hat Lernverzerrungen (Bias) durch einseitige Trainingsdaten, und KI-generierte Inhalte sind kein Beweis für
              reale Ereignisse. BYTEs "Alibi" ist wertlos.
            </div>
          `;
          state.solvedPuzzle('s06_ki');
          setTimeout(() => {
            engine.closePuzzle();
            engine.notify('📦 ITEM: Verschlüsselter Brief');
            inventory.addItem('geheimbrief');
            dialog.sequence([
              { char: 'kim', text: 'Die KI-Bilder sind alle gefälscht. Sieben Finger, drei Augen, zwei Nasen — typische Halluzinations-Muster. BYTEs Alibi ist nichts wert.' },
              { char: 'byte', text: 'Ihr... habt mich entlarvt. Aber findet ihr auch mein ECHTES Versteck?' },
              { char: 'kim', text: 'Du hast einen verschlüsselten Brief hinterlassen. ROT13, wenn ich raten müsste.' },
              { char: 'byte', text: '...ROT13 ist UNBREAKABLE.' },
              { char: 'justus', text: 'Äh... ist es das nicht wirklich nicht.', after: () => engine.loadScene('s07_krypto') },
            ]);
          }, 2000);
        } else {
          box.querySelector('#ki-q').innerHTML = `
            <div class="puzzle-feedback err">
              ${score}/3 korrekt. Lies die Hinweise nochmal und versuche es erneut!
              <button class="puzzle-btn" id="ki-retry" style="margin-top:0.5rem;">↺ WIEDERHOLEN</button>
            </div>
          `;
          box.querySelector('#ki-retry').onclick = () => { step = 0; score = 0; render(); };
        }
        return;
      }

      const q = questions[step];
      box.querySelector('#ki-q').innerHTML = `
        <p style="margin-bottom:0.8rem;">${step+1}. ${q.q}</p>
        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          ${q.opts.map((o,i) => `
            <button class="scenario-option-btn" data-i="${i}">
              ${String.fromCharCode(65+i)}) ${o.label}
            </button>
          `).join('')}
        </div>
        <div id="ki-opt-fb" class="puzzle-feedback" style="margin-top:0.4rem;"></div>
      `;

      box.querySelectorAll('.scenario-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const opt = q.opts[+btn.dataset.i];
          box.querySelectorAll('.scenario-option-btn').forEach(b => b.disabled = true);
          const fb = box.querySelector('#ki-opt-fb');
          if (opt.correct) {
            btn.classList.add('correct');
            fb.className = 'puzzle-feedback ok';
            fb.textContent = '✓ ' + opt.msg;
            score++;
          } else {
            btn.classList.add('wrong');
            fb.className = 'puzzle-feedback err';
            fb.textContent = '✗ ' + opt.wrong;
          }
          setTimeout(() => { step++; render(); }, 1600);
        });
      });
    };

    box.innerHTML = `
      <h2>🤖 KI-ANALYSE — BYTES DEEPFAKES</h2>
      <p>BYTEs KI hat Alibis generiert. 3 Fragen zum Thema KI, Lernverzerrung (Bias) und Fakten-Erfinden (Halluzinieren).</p>
      <div class="hint">
        💡 KI lernt aus Trainingsdaten. Schlechte oder einseitige Daten → verzerrtes Modell (Bias = Lernverzerrung).
        Generative KI kann außerdem Inhalte erfinden, die plausibel klingen aber falsch sind (Halluzinieren).
      </div>
      <div id="ki-q" style="margin-top:0.8rem;"></div>
    `;

    render();
  };
}

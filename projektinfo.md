# CYBER::KLASSE — Projektinfo für KI-Assistenten

> Diese Datei vor dem nächsten Prompt laden, damit der Kontext klar ist.

---

## Was ist das?

Eine **einzelne HTML-Datei** (`cyber-klasse.html`) — eine interaktive Lernwebsite für Informatik, Klasse 8. Thema: Grundlagen der Informatik, cyberpunk-ästhetisch gestaltet. Gedacht als Unterrichtseinheit von ~1–2 Schulstunden. Die Datei läuft **komplett im Browser, ohne Server, ohne Abhängigkeiten** (außer Google Fonts per CDN).

---

## Dateien im Projektordner

| Datei | Inhalt |
|---|---|
| `index.html` | Die komplette Website (~4004 Zeilen, eine Datei) |
| `cyber-klasse-loesungen.txt` | Lösungen aller 8 Gates für Lehrkräfte |
| `itslearning-fragen.txt` | 30 fertige Multiple-Choice-Fragen (5 pro Einheit) für itslearning |
| `projektinfo.md` | Diese Datei |
| `cyber-3d/` | **CYBER::TOWER** — 3D-Browser-Game (siehe unten) |

---

## Architektur der HTML-Datei

**Bewusst als eine Datei** — einfache Weitergabe per USB/Email, kein Build-Tool, kein Server.

```
index.html
├── <head>                    Zeile ~1–9
│   └── Google Fonts: Orbitron (Headlines), Share Tech Mono (Mono)
├── <style>                   Zeile ~10–1230
│   ├── CSS-Variablen: --bg, --text, --neon-blue/-green/-pink, etc.
│   ├── Light-Mode :root (Standard)
│   ├── body.dark-mode { ... } (Dark-Mode per Klasse)
│   ├── Nav, Sections, Gates, Buttons, Feedback
│   └── Pro Sektion: eigene Komponenten-CSS
├── <body>                    Zeile ~1231–2430
│   ├── #theme-toggle Button (fixed, bottom-right, 🌙/☀️)
│   ├── <nav>  (8+START Links, zentriert)
│   ├── .unlock-flash (Overlay für Gate-Animation)
│   ├── <section id="intro"> (Willkommensseite, kein Gate)
│   └── 8× <section> (siehe unten)
└── <script>                  Zeile ~2431–4004
    ├── Theme Toggle (localStorage: 'cyber-klasse-theme')
    ├── State-Objekt (unlocked: Set, Tape-Daten, etc.)
    ├── unlockSection(id) — entsperrt Section, aktualisiert Nav
    └── Pro Sektion: eigene Logik-Funktionen
```

---

## Die 8 Sektionen (+ Intro)

### 01 — WERKSTATT (Bits & Bytes)
- **Thema:** Was ist ein Bit? ASCII, Binärdarstellung
- **Interaktion:** 16-Bit-Klick-Tape → zeigt ASCII-Zeichen live
- **Gate-Lösung:** `01001000 01101001` (entspricht ASCII "Hi")
- **Freischaltet:** Sektion 02

### 02 — LOGIK-PUZZLE (Turing-Maschine)
- **Thema:** Was ist ein Algorithmus? Turing-Maschinen
- **Interaktion:** Konfigurierbarer Turing-Simulator (Regeln per Dropdown), Schritt-für-Schritt
- **Gate-Lösung:** Regeln so setzen: `0→1→R`, `1→0→R`, `_→_→H` (invertiert alle Bits)
  - Select-IDs im HTML: `explore-rule0-read` etc., JS: `readRules('explore', 2)`
- **Freischaltet:** Sektion 03

### 03 — DER TURM (Abstraktion)
- **Thema:** Abstraktionsschichten in der Informatik
- **Interaktion:** Drag-and-Drop Layer-Sortierung (Transistor → Hardware → OS → Software → Nutzer)
- **Gate-Lösung:** Korrekte Reihenfolge von unten nach oben (Transistor unten, Nutzer oben)
- **Freischaltet:** Sektion 04

### 04 — PIXEL-STUDIO (Digitale Darstellung)
- **Thema:** Wie werden Bilder digital gespeichert (Pixel, Bitmaps)
- **Interaktion:** 8×8 Pixel-Grid zum Malen + Binäreingabe pro Zeile
- **Gate-Lösung:** Ein bestimmtes 8×8 Bild (Schlüssel-Symbol) korrekt zeichnen/eingeben
- **Freischaltet:** Sektion 05

### 05 — PARADOXO-LAB (Halteproblem)
- **Thema:** Grenzen der Berechenbarkeit, Halteproblem, Alan Turing
- **Interaktion:** Schrittweise Paradoxon-Erklärung (5 Steps, je eine Frage)
- **Gate-Lösung:** Step 4 korrekt beantworten (das Paradox erkennen)
- **Freischaltet:** Sektion 06

### 06 — KI-ARENA (Künstliche Intelligenz)
- **Thema:** Wie funktioniert KI/ML, Bias, Halluzinieren, Grenzen
- **Interaktion:** Mini-Trainings-Simulator (Zahlen als gerade/ungerade labeln → Modell testen)
- **Gate-Lösung:** 5 Szenario-Fragen zu KI-Grenzen und Bias korrekt beantworten
- **Freischaltet:** Sektion 07

### 07 — KRYPTO (Verschlüsselung)
- **Thema:** Caesar-Chiffre, ROT13, Enigma, Turing als Codeknacker; Verbindung zu Einheit 01 (ASCII = Zahlen) und 02 (XOR = Bits kippen)
- **Interaktion:** Caesar-Encoder-Baukasten — Wörter aus Pool zusammenbauen, Schlüssel-Regler 1–25, Binärdarstellung live
- **Gate-Lösung:** `VASBEZNGVBA` → ROT13 entschlüsseln → `INFORMATION`
- **Freischaltet:** Sektion 08

### 08 — DATEN (Datenschutz)
- **Thema:** DSGVO, Passwort-Sicherheit, Hashing, KI in der Bewerbung, Lebensweltbezug
- **Interaktion:** Passwort-Baukasten mit Live-Entropie-Anzeige (Bits) und Stärkemeter
- **Gate-Lösung:** 3 Datenschutz-Szenarien aus dem Schüleralltag korrekt einordnen
- **Kein Auto-Unlock** (letzte Einheit, zeigt Abschluss-Block mit Verweis auf itslearning)

---

## Design-System

```css
/* Light Mode (default) */
--bg:         #f4f1ec   /* warmes Off-White */
--bg-card:    #ffffff
--text:       #2c2c34
--neon-blue:  #0077aa
--neon-green: #1a7a0a
--neon-pink:  #c41858

/* Dark Mode (body.dark-mode) */
--bg:         #0a0a0f
--neon-blue:  #00d4ff
--neon-green: #00ff88
--neon-pink:  #ff2d78
```

**Fonts:** `Orbitron` (Headlines, nav, labels) · `Share Tech Mono` (Fließtext, Code, interaktive Elemente)

**Dark/Light Toggle:** Button `#theme-toggle`, fixed bottom-right. Speichert in `localStorage['cyber-klasse-theme']`. Standard ist Light Mode.

---

## Gate-System (Unlock-Mechanismus)

```js
// state.unlocked = Set mit freigeschalteten Section-IDs
// unlockSection(id) → entfernt .locked, aktualisiert Nav, Flash-Animation
// Jede Sektion prüft ihre Lösung in einer checkGateX()-Funktion
// Beim Unlock: kurzer weißer Flash-Overlay (.unlock-flash)
// Kein Auto-Scroll (bewusst entfernt, damit Erfolgsmeldung sichtbar bleibt)
```

---

## HTTP-Dev-Server

```bash
cd /home/julian/Documents/vibecoding/Jg8-0und1 && python3 -m http.server 8765
# → http://localhost:8765/index.html
```

---

## Was bisher gemacht wurde (Verlauf)

1. ✅ Vollständige 6-Sektionen Website aufgebaut
2. ✅ Turing-Simulator IDs gefixt (`explore-rule0-read` etc.)
3. ✅ Auto-Scroll nach Gate-Lösung entfernt
4. ✅ Werkstatt-Text auf 4 Absätze gekürzt
5. ✅ Turing-Signifikanz-Absatz ergänzt
6. ✅ Emojis in Nav + Subtitles
7. ✅ Light-Mode als Standard, Dark-Mode Toggle (🌙/☀️)
8. ✅ CSS-Block nach Korruption komplett neu geschrieben (sauber)
9. ✅ Lösungsdatei `cyber-klasse-loesungen.txt` erstellt
10. ✅ 30 itslearning-Fragen in `itslearning-fragen.txt`
11. ✅ Nav zentriert (`justify-content: center`)
12. ✅ Sektion 07 KRYPTO: Caesar-Encoder-Baukasten + ROT13-Gate
13. ✅ Sektion 08 DATEN: Passwort-Baukasten mit Entropie-Anzeige + 3-Szenarien-Gate
14. ✅ Intro-Sektion (kein Gate, erklärt das Konzept)
15. ✅ Datei umbenannt zu `index.html` (4004 Zeilen)

---

## Bekannte offene Punkte / Ideen

- Nav-Links auf Mobile könnten emoji-only werden (Platz sparen)
- KI-Sektion hat etwas weniger interaktive Tiefe als 01–05
- Kein Print-Stylesheet (für den Fall von Ausdrucken)
- Die 30 Fragen decken alle Themen ab; Q2 (256 Werte bei 8 Bit) erfordert Schlussfolgerung aus der Interaktion, kein Direktzitat im Text
- itslearning-Fragen noch auf 8 Einheiten anpassen (aktuell 6 Einheiten abgedeckt)
- cyber-klasse-loesungen.txt noch auf Krypto- und Daten-Gate aktualisieren
- Projektlaufzeit realistisch: ~45 min für zielstrebige Schüler → Erweiterungsbedarf (siehe Ideen unten)

---

## CYBER::TOWER — 3D-Browser-Game

### Was ist das?

Ein **interaktives 3D-FPS-Spiel** im Browser (Three.js). Spieler läuft mit WASD + Maus durch einen Cyberpunk-Turm mit 5 Stockwerken. Jedes Stockwerk enthält ein Informatik-Puzzle aus der CYBER::KLASSE-Website. Spielzeit: ca. 20–30 Minuten.

- **Tech:** Three.js v0.162.0 (CDN), ES Modules, UnrealBloomPass, Web Audio API
- **Controls:** Desktop: PointerLock + WASD · iPad/Touch: Dual-Joysticks
- **Hosting:** GitHub Pages fähig (rein statisch, kein Server nötig)

### Dateistruktur

```
cyber-3d/
├── index.html              (Entry, importmap, HTML Overlays)
├── css/style.css           (UI, HUD, Terminal, Transitions)
└── js/
    ├── main.js             (Game Loop, Room Registry)
    ├── constants.js        (Farben, Maße, Floor-Daten)
    ├── state.js            (GameState + Event Emitter)
    ├── scene.js            (Three.js Scene + Bloom)
    ├── controls.js         (FPS Controls, Touch Joysticks)
    ├── physics.js          (AABB Collision + Gravity)
    ├── hud.js              (HUD Updates + Notifications)
    ├── interaction.js      (Raycaster-Interaktion, E-Taste)
    ├── elevator.js         (Stockwerk-Wechsel mit Fade)
    ├── fragments.js        (15 sammelbare Datenfragmente)
    ├── audio.js            (Prozeduraler Ambient-Drone + SFX)
    └── rooms/
        ├── Room.js         (Basis-Klasse für alle Räume)
        ├── lobby.js        (EG — Tutorial, Hologramm)
        ├── keller.js       (B1 — Bits & Bytes, 8 Schalter)
        ├── pixel.js        (F2 — 8×8 Pixel-Grid Puzzle)
        ├── krypto.js       (F3 — Caesar/ROT13 Cipher)
        └── dach.js         (Dach — Finale + Geheimraum)
```

### Die 5 Stockwerke

| Stock | ID | Thema | Puzzle | Neon-Farbe |
|---|---|---|---|---|
| EG | `lobby` | Tutorial | Terminals erkunden | Blau |
| B1 | `keller` | Bits & Bytes | 8 Schalter → ASCII "H" | Grün |
| F2 | `pixel` | Pixel-Darstellung | 8×8 Grid → Schlüssel-Symbol | Blau |
| F3 | `krypto` | Verschlüsselung | Caesar-Shift ROT13 | Pink |
| Dach | `dach` | Finale | Statistik-Anzeige, Geheimraum | Multi |

### Erweiterbarkeit

Neuen Raum hinzufügen:
1. Neue Datei in `js/rooms/` erstellen, `Room` extenden
2. `build()` überschreiben, Puzzle-Logik + Elevator-Interactable einbauen
3. In `js/main.js` importieren und in `ROOM_CLASSES` registrieren
4. In `js/constants.js` den Floor in `FLOORS` eintragen
5. Optional: Fragment-Positionen in `js/fragments.js` → `FRAGMENT_POSITIONS` hinzufügen

### Dev-Server

```bash
cd /home/julian/Documents/vibecoding/Jg8-0und1 && python3 -m http.server 8765
# → http://localhost:8765/cyber-3d/index.html
```

---

*Aktualisiert: Februar 2026 · Projekt: CYBER::KLASSE · Informatik Klasse 8 · 8 Einheiten · 4004 Zeilen + CYBER::TOWER 3D (~4200 Zeilen)*

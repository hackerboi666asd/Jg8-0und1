# CYBER::KLASSE — Projektinfo für KI-Assistenten

> Diese Datei vor dem nächsten Prompt laden, damit der Kontext klar ist.

---

## Was ist das?

Eine **einzelne HTML-Datei** (`cyber-klasse.html`) — eine interaktive Lernwebsite für Informatik, Klasse 8. Thema: Grundlagen der Informatik, cyberpunk-ästhetisch gestaltet. Gedacht als Unterrichtseinheit von ~1–2 Schulstunden. Die Datei läuft **komplett im Browser, ohne Server, ohne Abhängigkeiten** (außer Google Fonts per CDN).

---

## Dateien auf dem Desktop

| Datei | Inhalt |
|---|---|
| `cyber-klasse.html` | Die komplette Website (~2600 Zeilen, eine Datei) |
| `cyber-klasse-loesungen.txt` | Lösungen aller 6 Gates für Lehrkräfte |
| `itslearning-fragen.txt` | 30 fertige Multiple-Choice-Fragen (5 pro Einheit) für itslearning |
| `projektinfo.md` | Diese Datei |

---

## Architektur der HTML-Datei

**Bewusst als eine Datei** — einfache Weitergabe per USB/Email, kein Build-Tool, kein Server.

```
cyber-klasse.html
├── <head>                    Zeile ~1–9
│   └── Google Fonts: Orbitron (Headlines), Share Tech Mono (Mono)
├── <style>                   Zeile ~10–810
│   ├── CSS-Variablen: --bg, --text, --neon-blue/-green/-pink, etc.
│   ├── Light-Mode :root (Standard)
│   ├── body.dark-mode { ... } (Dark-Mode per Klasse)
│   ├── Nav, Sections, Gates, Buttons, Feedback
│   └── Pro Sektion: eigene Komponenten-CSS
├── <body>                    Zeile ~812–1380
│   ├── #theme-toggle Button (fixed, bottom-right, 🌙/☀️)
│   ├── <nav>  (6 Links, zentriert, 01–06)
│   ├── .unlock-flash (Overlay für Gate-Animation)
│   └── 6× <section> (siehe unten)
└── <script>                  Zeile ~1392–2610
    ├── Theme Toggle (localStorage: 'cyber-klasse-theme')
    ├── State-Objekt (unlocked: Set, Tape-Daten, etc.)
    ├── unlockSection(id) — entsperrt Section, aktualisiert Nav
    └── Pro Sektion: eigene Logik-Funktionen
```

---

## Die 6 Sektionen

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
- **Kein Gate** (letzte Einheit)

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
cd /home/julian/Desktop && python3 -m http.server 8765
# → http://localhost:8765/cyber-klasse.html
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
8. ✅ CSS-Block nach Korruption komplett neu geschrieben (810 Zeilen sauber)
9. ✅ Lösungsdatei `cyber-klasse-loesungen.txt` erstellt
10. ✅ 30 itslearning-Fragen in `itslearning-fragen.txt`
11. ✅ Nav zentriert (`justify-content: center`)

---

## Bekannte offene Punkte / Ideen

- Nav-Links auf Mobile könnten emoji-only werden (Platz sparen)
- KI-Sektion hat etwas weniger interaktive Tiefe als 01–05
- Kein Print-Stylesheet (für den Fall von Ausdrucken)
- Die 30 Fragen decken alle Themen ab; Q2 (256 Werte bei 8 Bit) erfordert Schlussfolgerung aus der Interaktion, kein Direktzitat im Text

---

*Generiert: Februar 2026 · Projekt: CYBER::KLASSE · Informatik Klasse 8*

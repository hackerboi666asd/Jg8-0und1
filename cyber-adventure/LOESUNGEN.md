# CYBER::ADVENTURES — Lösungen aller Puzzles

> Lehrenden-Datei. Nicht an SuS weitergeben! 🔒

---

## S00 — Kims Zimmer: Binär-Decoder

**Aufgabe:** 13 Binär-Bytes auf dem Monitor dekodieren.

Jede Karte anklicken (→ DEZ), dann im ASCII-Poster nachschlagen:

| Karte | Binär     | Dez | Zeichen |
|-------|-----------|-----|---------|
| 1     | 0100 0010 | 66  | B       |
| 2     | 0101 1001 | 89  | Y       |
| 3     | 0101 0100 | 84  | T       |
| 4     | 0100 0101 | 69  | E       |
| 5     | 0010 0000 | 32  | ␣       |
| 6     | 0101 0111 | 87  | W       |
| 7     | 0100 0001 | 65  | A       |
| 8     | 0101 0010 | 82  | R       |
| 9     | 0010 0000 | 32  | ␣       |
| 10    | 0100 1000 | 72  | H       |
| 11    | 0100 1001 | 73  | I       |
| 12    | 0100 0101 | 69  | E       |
| 13    | 0101 0010 | 82  | R       |

**Lösung:** `BYTE WAR HIER`

**Eingabe:** Den Text in das Textfeld tippen und auf ✓ klicken.

---

## S01 — Computerraum: ASCII-Decoder

**Aufgabe:** 6 Binär-Bytes → ASCII → Geheimwort.

| Karte | Binär     | Dez | Buchstabe |
|-------|-----------|-----|-----------|
| 1     | 0101 0011 | 83  | S         |
| 2     | 0100 0011 | 67  | C         |
| 3     | 0100 1000 | 72  | H         |
| 4     | 0101 0101 | 85  | U         |
| 5     | 0100 1100 | 76  | L         |
| 6     | 0100 0101 | 69  | E         |

**Lösung:** `SCHULE`

**Eingabe:** "SCHULE" in das Textfeld eingeben (Großbuchstaben, kein Leerzeichen).

---

## S02 — Konferenzraum: Turing-Maschine

**Aufgabe:** Die Turing-Maschine soll das Band `1 0 1 1 0` in `0 1 0 0 1` umwandeln (jeden Bit invertieren/umdrehen).

**Korrekte Regelkonfiguration:**

| Symbol gelesen | ➜ Schreiben | ➜ Kopf bewegen |
|----------------|-------------|----------------|
| `0`            | `1`         | Rechts ▶       |
| `1`            | `0`         | Rechts ▶       |
| `_` (Leer)     | `_`         | Halt ■ *(fest)* |

**Schritt-für-Schritt (Schritt-Modus):**

| Schritt | Kopf | Liest | Schreibt | Geht |
|---------|------|-------|----------|------|
| 1       | 0    | 1     | 0        | R    |
| 2       | 1    | 0     | 1        | R    |
| 3       | 2    | 1     | 0        | R    |
| 4       | 3    | 1     | 0        | R    |
| 5       | 4    | 0     | 1        | R    |
| 6       | 5    | _     | → Halt   |      |

**Ergebnis auf dem Band:** `0 1 0 0 1 _ _ _` ✓

**Tipp:** Die "_"-Regel (leer → Halt) ist bereits fest eingestellt und kann nicht verändert werden.

---

## S03 — Serverraum: Abstraktionsschichten

**Aufgabe:** 5 Schichten durch Drag & Drop in die richtige Reihenfolge bringen.
Reihenfolge ist **von oben (①) = Nutzer bis unten (⑤) = Transistor**.

| Position | Schicht       | Symbol |
|----------|---------------|--------|
| ① oben   | Nutzer        | 👤     |
| ②        | Software      | 📱     |
| ③        | Betriebssystem| 🐧     |
| ④        | Hardware      | 💻     |
| ⑤ unten  | Transistor    | ⚡     |

**Merksatz:** „Kein Transistor → keine Hardware → kein OS → keine Software → kein Nutzer."

---

## S04 — Petes Backup-Drive: Pixel-Schloss

**Aufgabe:** Ein 5×5-Raster mit Klicks (An/Aus) nach dem Vorbild ausfüllen.
Das Muster zeigt ein **Kreuz / Diamant-Symbol** (das Schlüssel-Pixel-Muster).

```
. . ■ . .
. ■ ■ ■ .
■ ■ . ■ ■
. ■ ■ ■ .
. . ■ . .
```

*(■ = angeklickt/weiß, . = leer/schwarz)*

Als Binär-Zeilen: `00100 / 01110 / 11011 / 01110 / 00100`

**Tipp aus dem Hint-Feld:** Zeile 1 in Binär: `0 0 1 0 0` = 4

---

## S05 — Polizeistation: Halteproblem-Quiz

Alle 3 Fragen müssen beantwortet werden. Mindestens 2/3 korrekt zum Bestehen.

| Frage | Richtige Antwort |
|-------|-----------------|
| Was tut PARASIT.EXE? | **B) Es hält an, wenn es nicht anhält — und hält nicht an, wenn es anhält.** |
| Warum kann kein Programm das Halteproblem allgemein lösen? | **B) Weil es prinzipiell kein Programm geben kann, das das allgemein für jedes beliebige andere Programm löst (Turing 1936).** |
| Was folgt daraus für PARASIT.EXE? | **B) Man kann nicht beweisen, dass es aufhört — kein Computer der Welt kann das allgemein entscheiden (das nennt man: unentscheidbar).** |

---

## S06 — KI-Labor: KI-Analyse-Quiz

Mindestens 2/3 korrekt zum Bestehen.

| Frage | Richtige Antwort |
|-------|-----------------|
| Ist BYTEs KI-"Beweis" glaubwürdig? | **B) Nein — KI kann falsche Fakten erfinden (Halluzinieren).** |
| BYTEs KI lernte nur aus seinen eigenen Posts. Welches Problem? | **B) Die KI hat Bias (= Lernverzerrung) — sie kennt nur BYTEs Weltsicht.** |
| Wie wertvoll sind KI-Bilder als Alibi? | **B) Nicht wertvoll — KI-generierte Bilder sind kein Beweis für reale Anwesenheit.** |

---

## S07 — Bytes Versteck: ROT13-Entschlüsselung

**Aufgabe:** Den verschlüsselten Text `VASBEZNGVBA` entschlüsseln.

**Methode:** Schieberegler auf **+13** (= ROT13) stellen.

ROT13-Tabelle (relevant):
```
V→I  A→N  S→F  B→O  E→R  Z→M  N→A  G→T  V→I  B→O  A→N
```

**Lösung:** `INFORMATION`

**Eingabe:** Den entschlüsselten Text in das Eingabefeld tippen (wird automatisch in Großbuchstaben umgewandelt).

---

## S08 — Finale: Zwei Puzzles

### Teil 1: Passwort-Stärke

**Aufgabe:** Welches Passwort hat genug Zufälligkeit (Entropie ≥ 50 Bit)?

**Richtige Antwort:** `K7#mP!v2qX&3`
*(zufällig, lang, Groß-/Kleinbuchstaben + Sonderzeichen + Ziffern)*

### Teil 2: DSGVO-Reaktions-Quiz

| Frage | Richtige Antwort |
|-------|-----------------|
| Was tun nach BYTEs Datenleck? | **B) DSGVO-Beschwerde einreichen + Anzeige erstatten.** *(Art. 17 DSGVO: Recht auf Löschung)* |
| Welche Datenkombination ist am gefährlichsten? | **B) Vollständiger Name, Adresse UND Geburtsdatum zusammen.** *(Kombination ermöglicht Identitätsdiebstahl)* |

---

## Schnell-Übersicht für die Tafel

| Szene | Rätsel-Typ | Lösung / Schlagwort |
|-------|-----------|---------------------|
| S00   | Binär → ASCII | `BYTE WAR HIER` |
| S01   | Binär → ASCII | `SCHULE` |
| S02   | Turing-Maschine | Regel: 0→1 rechts, 1→0 rechts |
| S03   | Drag & Drop Schichten | Transistor / Hardware / BS / Software / Nutzer |
| S04   | Pixel-Muster | Kreuz/Diamant-Muster im 5×5-Raster |
| S05   | Quiz Halteproblem | je Antwort B |
| S06   | Quiz KI / Bias | je Antwort B |
| S07   | ROT13 (+13) | `INFORMATION` |
| S08   | Passwort + DSGVO | `K7#mP!v2qX&3` / je Antwort B |

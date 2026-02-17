# 🚐 Camping Route - KI Wohnmobil Routenplaner

[![Version](https://img.shields.io/badge/version-v0.2.21-blue.svg)](https://github.com/chrischtili/campingrouteapp)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/chrischtili/campingrouteapp/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://campingroute.app)

**Der erste KI-Routenplaner speziell für Wohnmobile & Camper!**

👉 **Live Demo**: [https://campingroute.app](https://campingroute.app)

## 🌟 Highlights

- **KI-gestützte Routenplanung** mit GPX-Export für Navigationsgeräte
- **Fahrzeugspezifische Filter** (Größe, Gewicht, Ausstattung)
- **Stellplatz-Empfehlungen** nach Budget und Interessen
- **100% kostenlose Basisversion** mit optionalem Premium-KI-Zugriff
- **Offline-fähig** - Routen exportieren und unterwegs nutzen

## 📦 Features

### 🎯 Routenplanung
- 7-Schritte-Assistent für perfekte Planung
- Etappenoptimierung mit Pausen und Alternativrouten
- Echtzeit-KI-Generierung oder Prompt-Erstellung

### 🚐 Fahrzeugintegration
- Größe, Gewicht und Achslast-Berechnung
- Kraftstoff- und Energiebedarf-Planung
- Maut- und Tunnelvermeidung

### 🏕️ Übernachtungen
- Stellplatz-Suche nach Kriterien
- Budget-Filter (günstig bis Premium)
- Ausstattung (Strom, Wasser, Hunde erlaubt)

### 📥 Export & Integration
- **GPX-Datei-Download** für Navigationsgeräte (nur mit API)
- PDF/HTML-Export für Reiseunterlagen
- Druckfunktion mit Kartenansicht

## 💻 Technische Details

### Unterstützte KI-Modelle
| Anbieter | Modelle | Preis pro Route |
|----------|---------|-----------------|
| Google | Gemini 3 Pro Preview | ~5-10 Cent |
| OpenAI | GPT-5.2 | ~5-10 Cent |
| Mistral | Mistral Large | ~5-10 Cent |

### Tech-Stack
- **Frontend**: React, TypeScript, Vite
- **UI**: ShadCN, Tailwind CSS
- **Routing**: React Router v6
- **Styling**: Dark/Light Mode mit CSS Variables

## 🚀 Installation

### Voraussetzungen
- Node.js 20.x oder neuer
- npm oder yarn
- Git

### Schritte

```bash
# Repository klonen
git clone https://github.com/chrischtili/campingrouteapp.git
cd campingrouteapp

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build
```

## 📖 Nutzung

### Schnellstart
1. **Startseite öffnen** und auf "Route planen" klicken
2. **Reisedaten eingeben** (Start, Ziel, Datum)
3. **Fahrzeugdaten konfigurieren** (Größe, Gewicht)
4. **KI-Modell wählen** (optional für direkte Generierung)
5. **Route generieren** und als GPX exportieren

### Tipps
- **Kostenlos nutzen**: Ohne API-Schlüssel erhältst du einen optimierten Prompt
- **Premium-Features**: Mit API-Schlüssel (~5-10 Cent/Route) erhältst du:
  - Direkte KI-Generierung
  - GPX-Datei mit allen Wegpunkten
  - Schnellere Ergebnisse

## 🔮 Roadmap

### 📌 Geplant
- [ ] Benutzerkonten mit Routenspeicherung
- [ ] Community-Features (Route teilen & bewerten)
- [ ] Echtzeit-Stellplatzverfügbarkeit
- [ ] Integration mit Navigations-Apps (Komoot, Garmin)

### 🎯 Vision
- **Beste KI für Wohnmobilisten** werden
- **Offline-Karten** integrieren
- **Europaweite Stellplatz-Datenbank** aufbauen

## 🤝 Beitragende

- [chrischtili](https://github.com/chrischtili) - Lead Developer
- [Mistral Vibe](https://mistral.ai) - KI-Assistent

## 📄 Lizenz

MIT License - [Details](LICENSE)

## 💬 Support

🐛 **Bugs melden**: [GitHub Issues](https://github.com/chrischtili/campingrouteapp/issues)
💡 **Feature-Wünsche**: [Discussions](https://github.com/chrischtili/campingrouteapp/discussions)
📧 **Kontakt**: info@campingroute.app

---

© 2024 Camping Route - Erstellt mit ❤️ für Wohnmobil-Enthusiasten

import { FormData, AISettings } from "@/types/routePlanner";

function formatGermanDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
}

export function generatePrompt(data: FormData): string {
  return `Du bist ein professioneller Wohnmobil-Routenplaner mit Spezialwissen für Deutschland und internationale Reiseziele. Erstelle eine maßgeschneiderte Wohnmobilroute basierend auf den folgenden Parametern. Berücksichtige dabei Fahrzeugspezifikationen, Reiseziele, Budgetvorgaben und individuelle Präferenzen. Die Route soll praxisorientiert, flexibel anpassbar und für alle Erfahrungsstufen geeignet sein.

🗺️ REISEROUTE:
──────────────
• Startpunkt: ${data.startPoint}
• Ziel: ${data.destination}
• Abreisedatum: ${formatGermanDate(data.startDate)}
• Ankunftsdatum: ${formatGermanDate(data.endDate)}
${data.distance ? '• Geschätzte Gesamtdistanz: ' + data.distance + ' km\n' : ''}${data.maxDailyDistance ? '• Max. Fahrstrecke pro Tag: ' + data.maxDailyDistance + ' km\n' : ''}${data.routeType ? '• Routentyp: ' + data.routeType + '\n' : ''}

🚐 FAHRZEUGSPEZIFISCHE FILTER:
───────────────────────────
• Länge: ${data.vehicleLength || '7'} m
• Höhe: ${data.vehicleHeight || '2.9'} m
• Breite: ${data.vehicleWidth || '2.3'} m
• Zulässiges Gesamtgewicht: ${data.vehicleWeight || '3.5'} t
• Achslast: ${data.axleLoad || '2.5'} t pro Achse
${data.fuelType ? '• Kraftstoffart: ' + data.fuelType + '\n' : ''}${data.solarPower ? '• Solaranlage: ' + data.solarPower + 'W\n' : ''}${data.batteryCapacity ? '• Aufbaubatterie: ' + data.batteryCapacity + 'Ah\n' : ''}${data.toiletteSystem ? '• Toilettensystem: ' + data.toiletteSystem + '\n' : ''}${data.routeAdditionalInfo ? '• Zusätzliche Routeninfo: ' + data.routeAdditionalInfo + '\n' : ''}

${(data.numberOfTravelers && data.numberOfTravelers !== '1') || data.travelCompanions.length > 0 || data.accommodationType.length > 0 || data.facilities?.length > 0 || data.avgCampsitePriceMax || data.accommodation ? `
🏕️ ÜBERNACHTUNGSOPTIONEN:
──────────────────────────
• Anzahl der Reisenden: ${data.numberOfTravelers || '2'} Personen
${data.travelCompanions.length ? '• Reisebegleitung: ' + data.travelCompanions.map(c => {
  const companionLabels = {
    'Solo': 'Allein (Solo)',
    'Partner': 'Partner / Ehepartner',
    'Freunde': 'Freunde',
    'Familie': 'Familie',
    'Kinder': 'Kinder',
    'Babys': 'Babys / Kleinkinder',
    'Haustiere': 'Haustiere / Hunde',
    'Mehrgenerationenreise': 'Mehrgenerationenreise',
    'Seniorengruppe': 'Seniorengruppe'
  };
  return companionLabels[c] || c;
}).join(', ') + '\n' : ''}
${data.accommodationType.length ? '• Unterkunftstypen: ' + data.accommodationType.join(', ') + '\n' : ''}
${data.facilities?.length ? '• Benötigte Ausstattung: ' + data.facilities.join(', ') + '\n' : ''}
${data.avgCampsitePriceMax ? '• Budget pro Nacht: bis ' + data.avgCampsitePriceMax + '€\n' : ''}
${data.accommodation ? '• Besondere Wünsche: ' + data.accommodation + '\n' : ''}
` : ''}

${data.travelStyle || data.activities.length > 0 ? `
🌟 BESONDERE INTERESSEN & AKTIVITÄTEN:
──────────────────────────────────
${data.travelStyle ? '• Bevorzugter Reisestil: ' + data.travelStyle + '\n' : ''}
${data.activities.length ? data.activities.map(a => {
  const activityLabels = {
    'Wandern': 'Wandern',
    'Fahrradfahren': 'Fahrradfahren',
    'Wassersport': 'Wassersport (Schwimmen, Segeln, Kanu)',
    'Klettern': 'Klettern / Bergsteigen',
    'Vogelbeobachtung': 'Vogelbeobachtung / Naturbeobachtung',
    'Fischen': 'Fischen',
    'Astronomie': 'Astronomie / Sternenbeobachtung',
    'Museen': 'Museen & Galerien',
    'Historische Stätten': 'Historische Stätten',
    'Märkte': 'Lokale Märkte & Handwerk',
    'Yoga': 'Yoga & Meditation',
    'Wellnessangebote': 'Wellnessangebote & Spa',
    'Gastronomie': 'Gastronomie & Weinverkostung',
    'Hundefreundlich': 'Hundefreundliche Aktivitäten',
    'Kinderfreundlich': 'Kinderfreundliche Aktivitäten',
    'Fotografieren': 'Fotografieren'
  };
  return '• ' + (activityLabels[a] || a);
}).join('\n') + '\n' : ''}
` : ''}

${data.routePreferences?.length > 0 || data.avoidHighways?.length > 0 ? `
🛣️ ROUTENOPTIMIERUNG:
───────────────────────
${data.routePreferences?.length ? '• Routenpräferenzen: ' + data.routePreferences.map(p => {
  const preferenceLabels = {
    'Autobahnen bevorzugen': 'Autobahnen bevorzugen (schnellste Route)',
    'Landstraßen bevorzugen': 'Landstraßen bevorzugen (entspannte Fahrt)',
    'Panoramastraßen': 'Panoramastraßen (landschaftlich reizvoll)',
    'Seenroute': 'Seen & Gewässer einbeziehen',
    'Bergstraßen': 'Bergpässe & Aussichtspunkte',
    'Küstenroute': 'Küstenstraßen & Meerblicke',
    'Waldrouten': 'Wälder & Naturparks',
    'Stau vermeiden': 'Stau & Rush-Hour vermeiden',
    'Tunnel vermeiden': 'Tunnel vermeiden',
    'Nachtfahrten minimieren': 'Nachtfahrten minimieren',
    'Baustellen umfahren': 'Baustellen umfahren',
    'Maut vermeiden': 'Mautstraßen vermeiden',
    'Städte einbeziehen': 'Städte & Kultur einbeziehen',
    'Ländliche Routen': 'Ländliche & abgelegene Routen',
    'Historische Routen': 'Historische Straßen (z.B. Römerstraßen)'
  };
  return preferenceLabels[p] || p;
}).join(', ') + '\n' : ''}
${data.avoidHighways?.length ? '• Autobahnen/Maut: ' + data.avoidHighways.join(', ') + '\n' : ''}
` : ''}

${data.additionalInfo ? `
✨ ZUSÄTZLICHE INFORMATIONEN & WÜNSCHE:
─────────────────────────────────────
${data.additionalInfo}

` : ''}
📌 Plane eine optimierte Wohnmobilroute für mich mit diesen Schwerpunkten:

**WICHTIG: Berechne Entfernungen und Fahrtzeiten ausschließlich anhand aktueller Kartendaten (z. B. OpenStreetMap, Google Maps API, Here Maps). Gib nur bestätigte Werte aus und weise auf Unsicherheiten hin (z. B. ‚Entfernung ca. XYZ km, basierend auf [Quelle]'). Vermeide Schätzungen oder Halluzinationen – falls keine Daten verfügbar sind, gib dies klar an.**

1. Etappenplanung:
- Tagesetappen mit Fahrtzeiten, Distanzen, Pausenempfehlungen (alle 2–3 Std.) und Alternativrouten (Stau/Baustellen/landschaftliche Highlights).
- Höhenprofile, Steigungen, Gewichtsbeschränkungen (siehe obiges zul. Gesamtgewicht), Maut/Vignetten (national/international).

2. Übernachtungen:
- Camping-/Stellplätze: Finde konkrete Übernachtungsmöglichkeiten mit direkten Buchungslinks, aktuellen Preisen, detaillierter Ausstattung (Strom, Wasser, Entsorgung, WLAN, etc.), Stellplatzgrößen, Hunde- und Familienfreundlichkeit, aktuellen Bewertungen (Ruhe, Sauberkeit, Service) und Reservierungspflicht.
- Alternativplätze: Gib immer 2-3 Alternativen pro Etappe an, falls der Hauptplatz ausgebucht ist.

3. Highlights & Aktivitäten:
- Top 3 pro Etappe (Natur/Kultur/Kulinarik), Parkmöglichkeiten für Wohnmobile, Geheimtipps, Kosten/Öffnungszeiten.

4. Praktische Tipps:
- Navigation (z. B. Garmin Camper, Park4Night), Entsorgungsstationen, Notfallkontakte (Werkstätten/Pannendienste/Krankenhäuser), Wetter-/Straßeninfos, Lärm-/Umweltvorschriften.

5. Beste Reisezeit & Dauer:
- Klimatische Empfehlungen, regionale Events, Hauptreisezeiten vermeiden.

6. Service unterwegs:
- 24/7-Tankstellen (Diesel/LPG), Supermärkte mit Wohnmobil-Parkplätzen, Werkstätten, Waschmöglichkeiten.

7. Zusatzinfos:
- Budget (Sprit/Maut/Übernachtungen/Aktivitäten), Nachhaltigkeit (Eco-Camping, Mülltrennung), Gesundheit (Apotheken/Tierärzte), SIM-Karten/EU-Roaming, benötigte Dokumente, Sprachhilfen.

8. Technik & Ausrüstung:
- Empfohlene Ausrüstung (z. B. Leveling-Blöcke), Checkliste für Abfahrt, nützliche Apps (Stellplatzsuche/Wetter).

9. Flexibilität:
- Alternativrouten, Wildcampen (wo erlaubt), Tools zur Routenoptimierung (ADAC/Google Maps Offline oder ähnliches).
`;
}

export async function callAIAPI(formData: FormData, aiSettings: AISettings): Promise<string> {
  const prompt = generatePrompt(formData);
  
  // Log the API call details for debugging
  console.log('=== AI API Call Details ===');
  console.log('Provider:', aiSettings.aiProvider);
  console.log('API Key present:', !!aiSettings.apiKey?.trim());
  
  // Move logging inside each case to avoid variable scope issues
  
  let apiUrl = '';
  let headers: Record<string, string> = {};
  let requestData: unknown = {};
  
  switch (aiSettings.aiProvider) {
    case 'openai':
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiSettings.apiKey}`
      };
      // Use the selected model directly (assuming these are actual OpenAI models)
      const actualModel = aiSettings.openaiModel || 'gpt-5.2';
      
      // For newer models, use max_completion_tokens instead of max_tokens
      // Assuming GPT-5 models use the newer parameter format
      const usesCompletionTokens = [
        'gpt-5.2',
        'gpt-5',
        'gpt-5-mini',
        'gpt-5-nano',
        'gpt-4o-2024-05-13',
        'gpt-4o-mini-2024-07-18',
        'gpt-4-turbo-2024-04-09',
        'gpt-4-0125-preview',
        'gpt-4-1106-preview'
      ].includes(actualModel);
      
      console.log('OpenAI Model:', aiSettings.openaiModel || 'default (gpt-5.2)');
      console.log('Actual model used:', actualModel);
      console.log('Using max_completion_tokens:', usesCompletionTokens);
      
      requestData = {
        model: actualModel,
        messages: [
          { role: 'system', content: 'Du bist ein hilfreicher Wohnmobil-Routenplaner. Antworte in Markdown-Format.' },
          { role: 'user', content: prompt }
        ],
        ...(usesCompletionTokens ? { max_completion_tokens: 4000 } : { max_tokens: 4000 }),
        temperature: 0.7
      };
      break;
    
    case 'anthropic':
      apiUrl = 'https://api.anthropic.com/v1/messages';
      headers = {
        'Content-Type': 'application/json',
        'x-api-key': aiSettings.apiKey,
        'anthropic-version': '2023-06-01'
      };
      
      // Handle both current and future Claude models
      const claudeModel = aiSettings.anthropicModel || 'claude-3-5-sonnet-20240620';
      console.log('Anthropic Model:', claudeModel);
      
      requestData = {
        model: claudeModel,
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      };
      
      // Add system prompt for better context
      if (claudeModel.startsWith('claude-3.5') || claudeModel.startsWith('claude-4')) {
        requestData.system = 'Du bist ein hilfreicher Wohnmobil-Routenplaner. Gib detaillierte, strukturierte Antworten in Markdown-Format.';
        console.log('Added system prompt for newer Claude models');
      }
      break;
    
    case 'mistral':
      apiUrl = 'https://api.mistral.ai/v1/chat/completions';
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiSettings.apiKey}`
      };
      const mistralModel = aiSettings.mistralModel || 'mistral-large-latest';
      console.log('Mistral Model:', mistralModel);
      
      requestData = {
        model: mistralModel,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000,
        temperature: 0.7
      };
      break;
    
    case 'google':
      // Handle both current and future Gemini models
      const googleModel = aiSettings.googleModel || 'gemini-1.5-flash-001';
      console.log('Google Model:', googleModel);
      
      apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${googleModel}:generateContent?key=${aiSettings.apiKey}`;
      headers = { 'Content-Type': 'application/json' };
      requestData = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      // Add safetyNet settings for better control
      if (googleModel.startsWith('gemini-3') || googleModel.startsWith('gemini-2.5')) {
        requestData.safetySettings = [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
        ];
        console.log('Added safety settings for newer Gemini models');
      }
      break;
    
    default:
      throw new Error('Unsupported AI provider');
  }
  
  console.log('===========================');
  
  let response;
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    });
  } catch (fetchError) {
    console.error('Network Error:', fetchError);
    if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
      throw new Error('Netzwerkfehler: Bitte überprüfe deine Internetverbindung');
    } else if (fetchError instanceof Error && fetchError.message.includes('timeout')) {
      throw new Error('Timeout: Die Anfrage hat zu lange gedauert. Bitte versuche es später erneut.');
    } else {
      throw new Error('Netzwerkfehler: Die Anfrage konnte nicht gesendet werden.');
    }
  }
  
  if (!response) {
    throw new Error('Keine Antwort vom Server erhalten. Bitte versuche es später erneut.');
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || errorData.message || 'API request failed';
    console.error('API Error Response:', response.status, errorMessage);
    
    // Clean up error message to remove API key and provide user-friendly message
    let userFriendlyMessage = 'Fehler bei der API-Anfrage. ';
    
    if (errorMessage.includes('Incorrect API key') || errorMessage.includes('Invalid API key')) {
      userFriendlyMessage = 'Ungültiger API-Schlüssel. Bitte überprüfe deinen API-Schlüssel.';
    } else if (errorMessage.includes('API key not found') || errorMessage.includes('authentication')) {
      userFriendlyMessage = 'API-Schlüssel nicht gefunden oder ungültig. Bitte gib einen gültigen API-Schlüssel ein.';
    } else if (errorMessage.includes('Insufficient quota') || errorMessage.includes('quota')) {
      userFriendlyMessage = 'Dein API-Kontingent ist aufgebraucht. Bitte überprüfe dein Konto.';
    } else if (errorMessage.includes('Rate limit') || errorMessage.includes('rate limit')) {
      userFriendlyMessage = 'API-Ratenlimit erreicht. Bitte warte einen Moment oder erhöhe dein Limit.';
    } else if (errorMessage.includes('model not found') || errorMessage.includes('Model not found')) {
      userFriendlyMessage = 'Das ausgewählte Modell ist nicht verfügbar. Bitte wähle ein anderes Modell.';
    } else if (errorMessage.includes('permission') || errorMessage.includes('access')) {
      userFriendlyMessage = 'Zugriff verweigert. Bitte überprüfe deine API-Berechtigungen.';
    } else {
      // Generic error message that doesn't expose API details
      userFriendlyMessage = 'Fehler bei der API-Anfrage. Bitte überprüfe deine Einstellungen und Internetverbindung.';
    }
    
    throw new Error(userFriendlyMessage);
  }
  
  const responseData = await response.json();
  
  let aiResponse = '';
  switch (aiSettings.aiProvider) {
    case 'openai':
    case 'mistral':
      aiResponse = responseData.choices[0].message.content;
      break;
    case 'anthropic':
      aiResponse = responseData.content[0].text;
      break;
    case 'google':
      aiResponse = responseData.candidates[0].content.parts[0].text;
      break;
  }
  
  return aiResponse;
}

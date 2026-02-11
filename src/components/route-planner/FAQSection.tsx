import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <div id="faq" className="bg-white rounded-xl shadow-lg p-6 mt-12 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-purple-600">❓</span>
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-purple-700">
          Häufige Fragen
        </h2>
      </div>
     
      <Accordion type="single" collapsible className="w-full space-y-2">
        {/* Kosten & API */}
        <AccordionItem value="costs">
          <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600">💰</span>
              </div>
              <span className="font-medium">Ist Camping Route kostenlos?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="space-y-3">
              <p><strong>✅ Ja, komplett kostenlos!</strong></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span>📝</span> Ohne API:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Prompt-Generierung</li>
                    <li>Keine Kosten</li>
                    <li>Volle Kontrolle über den Prozess</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span>🤖</span> Mit API:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Direkte Routengenerierung</li>
                    <li>API-Kosten trägst du selbst (~5-12 Cent pro Anfrage)</li>
                    <li>Schnellere Ergebnisse</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-sm">
                <p className="flex items-center gap-2 mb-1">
                  <span>ℹ️</span>
                  <strong>Keine versteckten Kosten:</strong>
                </p>
                <p>Keine Abonnements, keine versteckten Gebühren. Du zahlst nur für deine eigene API-Nutzung, wenn du dich dafür entscheidest.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* KI-Modelle */}
        <AccordionItem value="models">
          <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600">✨</span>
              </div>
              <span className="font-medium">Welches KI-Modell sollte ich wählen?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <p className="mb-3"><strong>Empfehlung:</strong> Google Gemini 3 Pro Preview für beste Ergebnisse</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-1 text-sm">
                  <span>🌟</span> Google Gemini
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Beste geografische Daten</li>
                  <li>Präzise Stellplatzempfehlungen</li>
                  <li>Kosteneffizient</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-1 text-sm">
                  <span>🤖</span> OpenAI GPT-5.2
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Maximale Detailtiefe</li>
                  <li>Komplexe Anforderungen</li>
                  <li>Höchste Qualität</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-1 text-sm">
                  <span>⚡</span> Mistral AI
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Kosteneffizient</li>
                  <li>Europäische Routen</li>
                  <li>Gute Qualität</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Einzigartigkeit */}
        <AccordionItem value="unique">
          <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600">⭐</span>
              </div>
              <span className="font-medium">Was macht Camping Route einzigartig?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <p className="mb-3"><strong>Der einzige KI-Routenplaner speziell für Wohnmobile!</strong></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <span>🎯</span> Präzise Filter:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Fahrzeugdaten (Größe, Gewicht)</li>
                  <li>Budget (günstig bis premium)</li>
                  <li>Interessen (Natur, Stadt, Familie)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <span>🗺️</span> Intelligente Routen:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Stellplätze nach deinen Kriterien</li>
                  <li>Lokale Attraktionen</li>
                  <li>Optimale Etappenplanung</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg mt-3 text-sm">
              <p className="flex items-center gap-2 mb-1">
                <span>💡</span>
                <strong>Transparenter Prozess:</strong>
              </p>
              <p>Du behältst immer die Kontrolle - keine "Black Box" Ergebnisse wie bei anderen Planern!</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Prompt vs KI */}
        <AccordionItem value="prompt-vs-ai">
          <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600">🤖</span>
              </div>
              <span className="font-medium">Prompt vs. KI-Generierung - was ist der Unterschied?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 text-xl">📝</span>
                </div>
                <h4 className="font-semibold mb-2">Ohne API (kostenlos)</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-left">
                  <li>Optimierter Prompt</li>
                  <li>Für deine bevorzugte KI</li>
                  <li>Volle Kontrolle</li>
                  <li>Keine Kosten</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">⚡</span>
                </div>
                <h4 className="font-semibold mb-2">Mit API (Kosten ~8-12 Cent)</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-left">
                  <li>Direkte Routengenerierung</li>
                  <li>Fertige Route mit Details</li>
                  <li>Schnelleres Ergebnis</li>
                  <li>API-Kosten trägst du</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg mt-4 text-sm">
              <p className="flex items-center gap-2 mb-1">
                <span>ℹ️</span>
                <strong>Tipp:</strong>
              </p>
              <p>Probiere zuerst die kostenlose Prompt-Generierung aus, bevor du eine API einbindest!</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Datenschutz */}
        <AccordionItem value="privacy">
          <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-red-600">🔒</span>
              </div>
              <span className="font-medium">Wie werden meine Daten geschützt?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-2xl">🔒</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-3"><strong>100% lokal - 100% sicher!</strong></p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Keine Cloud-Speicherung:</strong> Alle Daten bleiben in deinem Browser</li>
                  <li><strong>Keine Tracking-Cookies:</strong> Wir sammeln keine Nutzerdaten</li>
                  <li><strong>DSGVO-konform:</strong> Keine Datenweitergabe an Dritte</li>
                  <li><strong>Offline-fähig:</strong> Einmal generierte Routen kannst du offline nutzen</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Offline Nutzung */}
        <AccordionItem value="offline">
          <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600">🗺️</span>
              </div>
              <span className="font-medium">Kann ich Routen offline nutzen?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-2xl">📱</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-3"><strong>Ja, komplett offline-fähig!</strong></p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Exportieren:</strong> Als Text kopieren oder PDF herunterladen</li>
                  <li><strong>Speichern:</strong> Alle Daten bleiben auf deinem Gerät</li>
                  <li><strong>Nutzen:</strong> Ohne Internetverbindung verwenden</li>
                  <li><strong>Teilen:</strong> Per E-Mail oder Messenger versenden</li>
                </ul>
                <div className="bg-yellow-50 p-3 rounded-lg mt-3 text-sm">
                  <p className="flex items-center gap-2">
                    <span>💡</span>
                    <strong>Tipp:</strong> Lade deine Route vor der Reise herunter, um unterwegs ohne Internet darauf zugreifen zu können!
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Fahrzeugtypen */}
        <AccordionItem value="vehicles">
          <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600">🚐</span>
              </div>
              <span className="font-medium">Welche Fahrzeugtypen werden unterstützt?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-teal-50 p-3 rounded-lg text-center">
                <div className="w-12 h-12 bg-teal-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-teal-600 text-xl">🚐</span>
                </div>
                <p className="text-sm font-medium">Wohnmobile</p>
                <p className="text-xs text-gray-600">Voll unterstützt</p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg text-center">
                <div className="w-12 h-12 bg-teal-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-teal-600 text-xl">🏕️</span>
                </div>
                <p className="text-sm font-medium">Camper</p>
                <p className="text-xs text-gray-600">Voll unterstützt</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center opacity-70">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-400 text-xl">🚛</span>
                </div>
                <p className="text-sm font-medium">Wohnwagen</p>
                <p className="text-xs text-gray-500">In Planung</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center opacity-70">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-400 text-xl">🏍️</span>
                </div>
                <p className="text-sm font-medium">Motorräder</p>
                <p className="text-xs text-gray-500">Geplant</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
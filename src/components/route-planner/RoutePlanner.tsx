import { useState, useRef } from "react";
import { Route, RotateCcw, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormData, AISettings, initialFormData, initialAISettings } from "@/types/routePlanner";
import { generatePrompt, callAIAPI } from "@/lib/promptGenerator";
import { AISettingsSection } from "./AISettingsSection";

// Importiere die providerModels aus der AISettingsSection oder definiere sie hier
const providerModels = {
  google: ['gemini-3-pro-preview', 'gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'],
  openai: ['gpt-5.2', 'gpt-5', 'gpt-5-mini', 'gpt-5-nano'],
  mistral: ['mistral-large-latest', 'mistral-small-latest'],
};
import { RouteSection } from "./RouteSection";
import { RouteOptimizationSection } from "./RouteOptimizationSection";
import { VehicleSection } from "./VehicleSection";
import { AccommodationSection } from "./AccommodationSection";
import { ActivitiesSection } from "./ActivitiesSection";
import { OutputSection } from "./OutputSection";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { RouteExampleSection } from "./RouteExampleSection";
import { FAQSection } from "./FAQSection";
import { AnchorNavigation } from "./AnchorNavigation";
import { Navbar } from "./Navbar";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Footer } from "@/components/ui/footer";

export function RoutePlanner() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [aiSettings, setAISettings] = useState<AISettings>(initialAISettings);
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [aiError, setAIError] = useState<string>('');
  const [aiModel, setAiModel] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const outputSectionRef = useRef<HTMLDivElement>(null);
  const aiSettingsSectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Schritt-Namen für den Assistenten
  const steps = [
    'KI-Einstellungen',
    'Reiseroute',
    'Routenoptimierung',
    'Fahrzeug Filter',
    'Übernachtung',
    'Besondere Interessen',
    'Zusammenfassung'
  ];

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleAISettingsChange = (settings: Partial<AISettings>) => {
    setAISettings(prev => ({ ...prev, ...settings }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = (prev[name as keyof FormData] as string[]) || [];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(v => v !== value) };
      }
    });
  };

  // Navigation zwischen Schritten
  const nextStep = () => {
    if (currentStep < steps.length) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      
      // Markiere aktuellen Schritt als abgeschlossen
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      // Auf mobilen Geräten zum Formular-Anfang scrollen
      if (window.innerWidth <= 768 && formRef.current) { // md breakpoint
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Kein Scrollen mehr
    }
  };

  const goToStep = (step: number) => {
    if (completedSteps.includes(step) || step === currentStep) {
      setCurrentStep(step);
      // Kein Scrollen mehr
    }
  };

  // Überprüfe ob alle Pflichtfelder für den aktuellen Schritt ausgefüllt sind
  const isStepValid = () => {
    switch (currentStep) {
      case 1: // KI-Einstellungen
        return aiSettings.useDirectAI ? isModelSelected() : true;
      case 2: // Reiseroute
        return !!formData.startPoint && !!formData.destination;
      case 3: // Routenoptimierung
        return true; // Optional
      case 4: // Fahrzeugspezifische Filter
        return true; // Optional - kein Pflichtfeld
      case 5: // Übernachtung
        return true; // Optional
      case 6: // Aktivitäten
        return true; // Optional
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAIError('');
    setOutput('');

    try {
      if (aiSettings.useDirectAI) {
        setLoadingMessage('🤖 Deine Wohnmobil-Route wird von der KI generiert...');
        
        if (!aiSettings.apiKey?.trim() || !/^[A-Za-z0-9-_]{20,}$/.test(aiSettings.apiKey)) {
          setAIError('Bitte gib einen gültigen API-Schlüssel ein (mindestens 20 Zeichen, nur Buchstaben, Zahlen, Bindestriche und Unterstriche).');
          setIsLoading(false);
          // Scroll to AI settings section and switch to step 1
          setTimeout(() => {
            goToStep(1);
            setTimeout(() => {
              aiSettingsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }, 100);
          }, 300);
          return;
        }
        
        // Wenn wir hier ankommen, hat der Benutzer einen gültigen API-Key eingegeben
        // Markiere alle Schritte als abgeschlossen, einschließlich des Zusammenfassung-Tabs
        const allSteps = steps; // Alle Schritte einschließlich des letzten
        const newCompletedSteps = [...completedSteps];
        
        allSteps.forEach((_, index) => {
          const stepNumber = index + 1;
          if (!newCompletedSteps.includes(stepNumber)) {
            newCompletedSteps.push(stepNumber);
          }
        });
        
        setCompletedSteps(newCompletedSteps);
        
        // Springe direkt zum Zusammenfassung-Tab
        setCurrentStep(steps.length); // Springe zum letzten Schritt (Zusammenfassung)

        // Route generieren (direktes Ergebnis ohne Nachbearbeitung)
        const aiResponse = await callAIAPI(formData, aiSettings);
        setOutput(aiResponse);
        setAiModel(aiSettings.aiProvider.toUpperCase());
        // Scroll to output after state update
        setTimeout(() => {
          outputSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 300);
      } else {
        setLoadingMessage('📝 Dein Prompt wird generiert...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const generatedOutput = generatePrompt(formData);
        setOutput(generatedOutput);
        setAiModel('');
        // Scroll to output after state update
        setTimeout(() => {
          outputSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 300);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error:', error);
      }
      if (error instanceof Error) {
        // Use the user-friendly error message directly
        setAIError(error.message);
      } else {
        setAIError('Fehler beim Aufruf der KI. Bitte überprüfe deinen API-Schlüssel und deine Internetverbindung.');
      }
      // Scroll to AI settings section and switch to step 1 when there's an error
      setTimeout(() => {
        goToStep(1);
        setTimeout(() => {
          aiSettingsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 100);
      }, 300);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setOutput('');
    setAIError('');
  };

  const isModelSelected = () => {
    if (!aiSettings.useDirectAI) return true; // Wenn KI nicht direkt genutzt wird, ist kein Modell erforderlich
    
    const currentProvider = aiSettings.aiProvider;
    const modelKey = `${currentProvider}Model` as 'openaiModel' | 'mistralModel' | 'googleModel';
    return !!aiSettings[modelKey]; // Gibt true zurück, wenn ein Modell ausgewählt ist
  };

  return (
    <main className="min-h-screen bg-background" id="main-content">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Route Example Section */}
      <RouteExampleSection />

      {/* Main Content */}
      <div className="container py-8 mt-0 relative z-10" id="main-content">
        {/* Step-by-Step Assistant */}
        <form onSubmit={handleSubmit} ref={formRef} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Routenplaner-Assistent
              </h2>
              <span className="text-sm text-gray-600">
                Schritt {currentStep} von {steps.length}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            
            {/* Step Navigation */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 text-xs">
              {steps.map((step, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToStep(index + 1)}
                  className={`px-2 py-1 rounded-sm text-center transition-colors ${
                    currentStep === index + 1 
                      ? 'bg-primary text-white font-medium'
                      : completedSteps.includes(index + 1)
                        ? 'bg-green-200 text-green-900 hover:bg-green-300'
                        : 'bg-gray-200 text-gray-700 cursor-not-allowed'
                  }`}
                  disabled={!completedSteps.includes(index + 1) && currentStep !== index + 1}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
          
          {/* Current Step Content */}
          <div className="space-y-6">
            {/* Step 1: KI-Einstellungen */}
            {currentStep === 1 && (
              <div id="step-1" ref={aiSettingsSectionRef}>
                <AISettingsSection 
                  aiSettings={aiSettings}
                  onAISettingsChange={handleAISettingsChange}
                  aiError={aiError}
                />
              </div>
            )}
            
            {/* Step 2: Reiseroute */}
            {currentStep === 2 && (
              <div id="step-2">
                <RouteSection 
                  formData={formData}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {/* Step 3: Routenoptimierung */}
            {currentStep === 3 && (
              <div id="step-3">
                <RouteOptimizationSection 
                  formData={formData}
                  onCheckboxChange={handleCheckboxChange}
                />
              </div>
            )}
            
            {/* Step 4: Fahrzeug */}
            {currentStep === 4 && (
              <div id="step-4">
                <VehicleSection 
                  formData={formData}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {/* Step 5: Übernachtung */}
            {currentStep === 5 && (
              <div id="step-5">
                <AccommodationSection 
                  formData={formData}
                  onChange={handleFormChange}
                  onCheckboxChange={handleCheckboxChange}
                />
              </div>
            )}
            
            {/* Step 6: Aktivitäten */}
            {currentStep === 6 && (
              <div id="step-6">
                <ActivitiesSection 
                  formData={formData}
                  onChange={handleFormChange}
                  onCheckboxChange={handleCheckboxChange}
                />
              </div>
            )}
            
            {/* Step 7: Zusammenfassung & Generierung */}
            {currentStep === 7 && (
              <div id="step-7">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Zusammenfassung Ihrer Route
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Startpunkt:</span>
                      <span className="font-medium">{formData.startPoint || 'Nicht angegeben'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ziel:</span>
                      <span className="font-medium">{formData.destination || 'Nicht angegeben'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">KI-Methode:</span>
                      <span className="font-medium">{aiSettings.useDirectAI ? 'Direkte KI-Generierung' : 'Prompt-Generierung'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          
          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2 w-full md:w-auto"
            >
              <ArrowUp className="h-4 w-4 transform -rotate-90" />
              Zurück
            </Button>
            
            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="gap-2 bg-primary hover:bg-primary/90 w-full md:w-auto"
              >
                Weiter
                <ArrowUp className="h-4 w-4 transform rotate-90" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                size="lg"
                className="gap-2 px-4 md:px-6 bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto"
                disabled={isLoading || !formData.startPoint || !formData.destination || (aiSettings.useDirectAI && !isModelSelected())}
              >
                <MapPin className="h-5 w-5" />
                {aiSettings.useDirectAI ? 'Route Generieren' : 'Prompt Generieren'}
              </Button>
            )}
          </div>
        </div>
        </form>
        

        {/* Output */}
        <div ref={outputSectionRef}>
          <OutputSection
            output={output}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            aiModel={aiModel}
            aiProvider={aiSettings.aiProvider}
            aiError={aiError}
            useDirectAI={aiSettings.useDirectAI}
          />
        </div>

        {/* FAQ Section */}
        <FAQSection />

      {/* Anchor Navigation */}
      <AnchorNavigation />
      
      {/* Modern Scroll to Top Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12 bg-background/90 backdrop-blur-lg border-primary/20 
                    hover:bg-primary/10 hover:border-primary/30 shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Nach oben scrollen"
        >
          <div className="relative">
            <ArrowUp className="h-5 w-5 text-primary animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent 
                          rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Button>
      </div>

      </div>
      <Footer />
    </main>
  );
}

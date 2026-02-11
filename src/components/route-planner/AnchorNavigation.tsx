import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function AnchorNavigation() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const sections = [
    { id: "home", label: "Start" },
    { id: "features", label: "Features" },
    { id: "testimonials", label: "Erfahrungen" },
    { id: "example-route", label: "Beispielroute" },
    { id: "main-content", label: "Routenplaner" },
    { id: "faq", label: "FAQ" }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // 120px offset für Navbar
      
      // Find the current active section
      let currentSection = "";
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section.id;
          }
        }
      });
      
      setActiveSection(currentSection);
      
      // Show/hide navigation based on scroll position
      setIsVisible(window.scrollY > 400);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Berücksichtige die Höhe der Navbar (ca. 80px)
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <div className={`fixed bottom-32 right-4 z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-background/90 backdrop-blur-lg rounded-lg shadow-lg border border-primary/20 overflow-hidden">
        <div className="p-2 space-y-1">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              className={`w-full justify-start gap-2 text-xs ${activeSection === section.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-primary/5"}`}
              onClick={() => scrollToSection(section.id)}
            >
              <span className="w-2 h-2 rounded-full bg-current opacity-50"></span>
              {section.label}
            </Button>
          ))}
        </div>
        
        {/* Scroll to top button */}
        <div className="border-t border-primary/10 p-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center gap-2 text-xs text-muted-foreground hover:bg-primary/5"
            onClick={() => scrollToSection("home")}
          >
            <ArrowUp className="h-3 w-3" />
            Nach oben
          </Button>
        </div>
      </div>
    </div>
  );
}
import * as React from "react";
import { debounce } from "@/lib/performanceUtils";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Use matchMedia which is more efficient than reading innerWidth
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Debounce the change handler to prevent rapid successive calls
    const onChange = debounce(() => {
      setIsMobile(mql.matches);
    }, 100);
    
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches); // Use mql.matches instead of reading innerWidth
    
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
}

/**
 * Performance utilities to prevent layout thrashing and forced synchronous layouts
 */

/**
 * Batch DOM reads and writes to prevent layout thrashing
 * @param readCallback - Function that reads layout properties
 * @param writeCallback - Function that writes to DOM
 */
export function batchDOMOperations(
  readCallback: () => any,
  writeCallback: (readResult: any) => void
): void {
  // Read all layout properties first
  const readResult = readCallback();
  
  // Use requestAnimationFrame to batch writes
  requestAnimationFrame(() => {
    writeCallback(readResult);
  });
}

/**
 * Safe layout property reader that avoids forced synchronous layouts
 * @param callback - Function that reads layout properties
 * @returns Promise with the read result
 */
export function readLayoutSafely<T>(callback: () => T): Promise<T> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(callback());
    });
  });
}

/**
 * Debounce function to prevent rapid successive calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle function to limit call frequency
 * @param func - Function to throttle
 * @param limit - Minimum time between calls in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>): void {
    const now = Date.now();
    const remaining = limit - (now - lastCall);
    
    if (remaining <= 0) {
      lastCall = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}
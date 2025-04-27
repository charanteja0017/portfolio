// Declare the gtag function to make TypeScript happy
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Initialize Google Analytics
 * This is a no-op function as we are using the gtag script in index.html
 * Kept for API compatibility
 */
export const initGA = (): void => {
  // GA is already initialized via the script tag in index.html
};

/**
 * Track a page view in Google Analytics
 * @param path The path to track (default: current path)
 */
export const pageView = (path?: string): void => {
  const page = path || window.location.pathname + window.location.search;
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-87QCY92YDF', {
      page_path: page
    });
  }
};

/**
 * Track an event in Google Analytics
 * @param category Event category
 * @param action Event action
 * @param label Event label (optional)
 * @param value Event value (optional)
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}; 
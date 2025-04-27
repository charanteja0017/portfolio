import ReactGA from 'react-ga4';

/**
 * Initialize Google Analytics
 * @param trackingId Your Google Analytics tracking ID (e.g., "G-XXXXXXXXXX")
 */
export const initGA = (trackingId: string): void => {
  if (!trackingId) {
    console.warn('Google Analytics tracking ID not provided');
    return;
  }

  ReactGA.initialize(trackingId);
};

/**
 * Track a page view in Google Analytics
 * @param path The path to track (default: current path)
 */
export const pageView = (path?: string): void => {
  const page = path || window.location.pathname + window.location.search;
  ReactGA.send({ hitType: 'pageview', page });
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
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
}; 
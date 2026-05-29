// Simple view manager for page navigation (like activateView)
let currentView = { name: 'Home', params: {} };
let viewListeners = new Set();

export function activateView(viewName, params = {}) {
  currentView = { name: viewName, params };
  viewListeners.forEach(listener => listener(currentView));
  // Also update browser URL if needed
  window.history.pushState({}, '', `/${viewName.toLowerCase()}`);
}

export function subscribeToView(listener) {
  viewListeners.add(listener);
  return () => viewListeners.delete(listener);
}

export function getCurrentView() {
  return currentView;
}
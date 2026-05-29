export function ref(initialValue) {
  let value = initialValue;
  const listeners = new Set();
  let updateId = 0;
  
  const reactiveRef = {
    get value() {
      return value;
    },
    set value(newValue) {
      value = newValue;
      updateId++;
      // Notify all listeners
      listeners.forEach(listener => {
        try {
          listener(value);
        } catch(e) {
          console.error('Error in reactive listener:', e);
        }
      });
    },
    subscribe(listener) {
      listeners.add(listener);
      // Return unsubscribe function
      return () => listeners.delete(listener);
    },
    forceUpdate() {
      listeners.forEach(listener => {
        try {
          listener(value);
        } catch(e) {
          console.error('Error in force update:', e);
        }
      });
    },
    // Add a version number to track changes
    get version() {
      return updateId;
    }
  };
  
  return reactiveRef;
}
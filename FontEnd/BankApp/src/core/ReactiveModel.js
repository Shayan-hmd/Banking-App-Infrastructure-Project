// This makes data reactive like Vue's ref()
export function ref(initialValue) {
  let value = initialValue;
  const listeners = new Set();
  
  return {
    get value() {
      return value;
    },
    set value(newValue) {
      if (value !== newValue) {
        value = newValue;
        listeners.forEach(listener => listener(newValue));
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

// For watching reactive changes
export function watchEffect(callback) {
  callback();
}
// Simple alert manager with one green alert box
let alertCallback = null;

export function showAlert(title, message, onConfirm = null) {
  // Store callback for later
  alertCallback = onConfirm;
  
  // Get or create alert container
  let alertContainer = document.getElementById('custom-alert-container');
  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.id = 'custom-alert-container';
    document.body.appendChild(alertContainer);
  }
  
  // Create alert HTML
  alertContainer.innerHTML = `
    <div class="fixed inset-0 flex items-center justify-center z-50" id="alert-overlay">
      <div class="bg-white rounded-2xl border-2 border-black shadow-2xl max-w-md w-full mx-4 overflow-hidden" style="animation: fadeIn 0.2s ease-out;">
        <!-- Green Header at Top -->
        <div class="bg-green-900 text-white text-center py-4">
          <h2 class="text-xl font-bold">${title}</h2>
        </div>
        
        <!-- Message Content -->
        <div class="bg-green-50 px-6 py-8">
          <p class="text-gray-800 text-lg text-center">
            ${message}
          </p>
        </div>
        
        <!-- OK Button at Bottom Center -->
        <div class="bg-green-50 px-6 pb-6 flex justify-center">
          <button id="alert-ok-button" class="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-2 px-8 rounded-lg transition duration-300 focus:outline-none">
            OK
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listener to OK button
  const okButton = document.getElementById('alert-ok-button');
  const overlay = document.getElementById('alert-overlay');
  
  const closeAlert = () => {
    if (alertCallback) {
      alertCallback();
      alertCallback = null;
    }
    alertContainer.innerHTML = '';
  };
  
  if (okButton) {
    okButton.addEventListener('click', closeAlert);
  }
  
  // Close when clicking outside the alert box (on transparent background)
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAlert();
      }
    });
  }
}

// Helper function for simple calls
export function showSimpleAlert(message, onConfirm = null) {
  showAlert("Alert", message, onConfirm);
}

// Add CSS animation to document if not already added
if (!document.getElementById('alert-styles')) {
  const style = document.createElement('style');
  style.id = 'alert-styles';
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}
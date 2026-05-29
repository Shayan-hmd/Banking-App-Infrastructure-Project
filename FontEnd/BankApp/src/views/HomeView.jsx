import React, { useState, useEffect } from 'react';
import { HomeConfig, HomeHandler } from '../stores/appStore';

export default function HomeView() {
  const [rerender, setRerender] = useState(0);
  const config = HomeConfig.componentProps;
  
  useEffect(() => {
    const unsubHeading = config.heading.subscribe(() => setRerender(r => r + 1));
    const unsubButtons = config.buttons.subscribe(() => setRerender(r => r + 1));
    
    return () => {
      unsubHeading();
      unsubButtons();
    };
  }, []);
  
  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {config.heading.value}
      </h1>
      
      <div className="flex items-center justify-center gap-20 mt-20">
        {config.buttons.value.map((button) => (
          <button
            key={button.id}
            onClick={() => HomeHandler.onButtonClick(button.id)}
            className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300"
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
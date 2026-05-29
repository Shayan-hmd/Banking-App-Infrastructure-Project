import React, { useState, useEffect } from 'react';
import { CustomerDetailsConfig, CustomerDetailsHandler } from '../stores/appStore';
import Textbox from '../components/Textbox';

export default function CustomerDetailsView() {
  const [rerender, setRerender] = useState(0);
  const config = CustomerDetailsConfig.componentProps;
  
  useEffect(() => {
    const unsubName = config.customerName.valueprop.subscribe(() => setRerender(r => r + 1));
    const unsubEmail = config.customerEmail.valueprop.subscribe(() => setRerender(r => r + 1));
    const unsubAge = config.customerAge.valueprop.subscribe(() => setRerender(r => r + 1));
    const unsubIdentity = config.customerIdentity.valueprop.subscribe(() => setRerender(r => r + 1));
    
    // Initialize page
    CustomerDetailsHandler.initPage();
    
    return () => {
      unsubName();
      unsubEmail();
      unsubAge();
      unsubIdentity();
    };
  }, []);
  
  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {config.title.value}
      </h1>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <Textbox
          label={config.customerName.labelprop}
          value={config.customerName.valueprop.value}
          onChange={(value) => CustomerDetailsHandler.onInputChange('name', value)}
          placeholder="Enter customer name"
        />
        
        <Textbox
          label={config.customerEmail.labelprop}
          value={config.customerEmail.valueprop.value}
          onChange={(value) => CustomerDetailsHandler.onInputChange('email', value)}
          type="email"
          placeholder="Enter customer email"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <Textbox
          label={config.customerAge.labelprop}
          value={config.customerAge.valueprop.value}
          onChange={(value) => CustomerDetailsHandler.onInputChange('age', value)}
          type="number"
          placeholder="Enter customer age"
        />
        
        <Textbox
          label={config.customerIdentity.labelprop}
          value={config.customerIdentity.valueprop.value}
          onChange={(value) => CustomerDetailsHandler.onInputChange('identity', value)}
          placeholder="Enter identity number"
        />
      </div>
      
      <div className="flex justify-between items-center mt-12">
        <button
          onClick={() => CustomerDetailsHandler.onBackButtonClick()}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          {config.backButton.labelprop}
        </button>
        
        <button
          onClick={() => CustomerDetailsHandler.onAccountDetailsButtonClick()}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          {config.accountDetailsButton.labelprop}
        </button>
      </div>
    </div>
  );
}
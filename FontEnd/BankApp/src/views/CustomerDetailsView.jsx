import React, { useState, useEffect } from 'react';
import { CustomerDetailsConfig, CustomerDetailsHandler } from '../stores/appStore';
import Textbox from '../components/Textbox';

export default function CustomerDetailsView() {
  const [rerender, setRerender] = useState(0);
  const [localCustomerData, setLocalCustomerData] = useState({
    name: "",
    email: "",
    age: "",
    identity: ""
  });
  const config = CustomerDetailsConfig.componentProps;
  
  useEffect(() => {
    // Subscribe to model changes to sync local state when data loads from API
    const unsubName = config.customerName.valueprop.subscribe((newValue) => {
      console.log("Name changed in model:", newValue);
      setLocalCustomerData(prev => ({ ...prev, name: newValue || "" }));
      setRerender(r => r + 1);
    });
    
    const unsubEmail = config.customerEmail.valueprop.subscribe((newValue) => {
      console.log("Email changed in model:", newValue);
      setLocalCustomerData(prev => ({ ...prev, email: newValue || "" }));
      setRerender(r => r + 1);
    });
    
    const unsubAge = config.customerAge.valueprop.subscribe((newValue) => {
      console.log("Age changed in model:", newValue);
      setLocalCustomerData(prev => ({ ...prev, age: newValue || "" }));
      setRerender(r => r + 1);
    });
    
    const unsubIdentity = config.customerIdentity.valueprop.subscribe((newValue) => {
      console.log("Identity changed in model:", newValue);
      setLocalCustomerData(prev => ({ ...prev, identity: newValue || "" }));
      setRerender(r => r + 1);
    });
    
    // Initialize page - load existing data into local state
    // CustomerDetailsHandler.initPage();
    
    // Load initial values from model to local state
    setLocalCustomerData({
      name: config.customerName.valueprop.value || "",
      email: config.customerEmail.valueprop.value || "",
      age: config.customerAge.valueprop.value || "",
      identity: config.customerIdentity.valueprop.value || ""
    });
    
    return () => {
      unsubName();
      unsubEmail();
      unsubAge();
      unsubIdentity();
    };
  }, []);
  
  // Handle input changes - update local state immediately, update model on blur
  const handleInputChange = (field, value) => {
    console.log(`Input changed - ${field}:`, value);
    // Update local state immediately for smooth typing
    setLocalCustomerData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleInputBlur = (field, value) => {
    console.log(`Input blur - ${field}:`, value);
    // Update model on blur (when user leaves the field)
    CustomerDetailsHandler.onInputChange(field, value);
  };
  
  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {config.title.value}
      </h1>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <Textbox
          label={config.customerName.labelprop}
          value={localCustomerData.name}
          disabled={config.customerName.disabledprop?.value || false}
          onChange={(value) => handleInputChange('name', value)}
          onBlur={(value) => handleInputBlur('name', value)}
          placeholder="Enter customer name"
        />
        
        <Textbox
          label={config.customerEmail.labelprop}
          value={localCustomerData.email}
          disabled={config.customerEmail.disabledprop?.value || false}
          onChange={(value) => handleInputChange('email', value)}
          onBlur={(value) => handleInputBlur('email', value)}
          type="email"
          placeholder="Enter customer email"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <Textbox
          label={config.customerAge.labelprop}
          value={localCustomerData.age}
          disabled={config.customerAge.disabledprop?.value || false}
          onChange={(value) => handleInputChange('age', value)}
          onBlur={(value) => handleInputBlur('age', value)}
          type="number"
          placeholder="Enter customer age"
        />
        
        <Textbox
          label={config.customerIdentity.labelprop}
          value={localCustomerData.identity}
          disabled={config.customerIdentity.disabledprop?.value || false}
          onChange={(value) => handleInputChange('identity', value)}
          onBlur={(value) => handleInputBlur('identity', value)}
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
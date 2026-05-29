import React, { useState, useEffect } from 'react';
import { CustomerListConfig, CustomerListHandler } from '../stores/appStore';
import Listbox from '../components/Listbox';

export default function CustomerListView() {
  const [rerender, setRerender] = useState(0);
  const config = CustomerListConfig.componentProps;
  
  useEffect(() => {
    const unsubSearch = config.searchInput.valueprop.subscribe(() => setRerender(r => r + 1));
    const unsubItems = config.listbox.itemsprop.subscribe(() => setRerender(r => r + 1));
    
    // Load initial data
    CustomerListHandler.loadCustomers();
    
    return () => {
      unsubSearch();
      unsubItems();
    };
  }, []);
  
  if (config.listbox.isLoadingprop?.value) {
    return (
      <div className="px-8 pb-8">
        <div className="text-center text-gray-600">Loading customers...</div>
      </div>
    );
  }
  
  return (
    <div className="px-8 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Customer List
      </h1>
      
      {config.listbox.errorprop?.value && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {config.listbox.errorprop.value}
        </div>
      )}
      
      {/* Search Row */}
      <div className="flex gap-4 mb-6">
        <div className="flex-grow">
          <input
            type="text"
            value={config.searchInput.valueprop.value}
            onChange={(e) => CustomerListHandler.onSearchInputChange(e.target.value)}
            placeholder={config.searchInput.placeholderprop}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-900 bg-white text-gray-900"
          />
        </div>
        
        <button
          onClick={() => CustomerListHandler.onSearchClick()}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          {config.searchButton.labelprop}
        </button>
      </div>
      
      {/* Listbox */}
      <div className="mb-6">
        <Listbox
          title={config.listbox.titleprop}
          items={config.listbox.itemsprop.value}
          onSelectItem={(customer) => CustomerListHandler.onSelectCustomer(customer)}
          renderItem={(customer) => (
            <div>
              <div className="font-bold text-gray-800">{customer.name}</div>
              <div className="text-sm text-gray-500">{customer.email}</div>
            </div>
          )}
        />
      </div>
      
      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => CustomerListHandler.onBackButtonClick()}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          {config.backButton.labelprop}
        </button>
        
        <button
          onClick={() => CustomerListHandler.onDetailsButtonClick()}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          {config.detailsButton.labelprop}
        </button>
      </div>
    </div>
  );
}
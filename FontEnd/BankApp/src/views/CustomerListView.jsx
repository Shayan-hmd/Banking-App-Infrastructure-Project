import React, { useState, useEffect } from 'react';
import { CustomerListModel, CustomerListConfig, CustomerListHandler } from '../stores/appStore';
import Listbox from '../components/Listbox';
import Textbox from '../components/Textbox';

export default function CustomerListView() {
  const [rerender, setRerender] = useState(0);
  const [dataVersion, setDataVersion] = useState(0);
  const [searchTextLocal, setSearchTextLocal] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // ← ADD THIS for tracking selection
  const config = CustomerListConfig.componentProps;
  
  useEffect(() => {
    // Subscribe to itemsprop changes (when data loads)
    const unsubItems = config.listbox.itemsprop.subscribe((newValue) => {
      console.log("Itemsprop changed, new value:", newValue);
      setDataVersion(v => v + 1);
      setRerender(r => r + 1);
    });
    
    // ✅ Subscribe to selectedCustomer changes and update local state
    const unsubSelected = CustomerListModel.selectedCustomer.subscribe((newValue) => {
      console.log("Selected customer changed in model:", newValue);
      setSelectedCustomerId(newValue?.customerId || null);
      setRerender(r => r + 1);  // Force re-render
    });
    
    return () => {
      unsubItems();
      unsubSelected();
    };
  }, []);
  
  // Handle input change - update model
  const handleSearchInputChange = (value) => {
    setSearchTextLocal(value);
  };
  
  // Handle customer selection - updates model
  const handleSelectCustomer = (customer) => {
    console.log("Customer selected:", customer);
    CustomerListHandler.onSelectCustomer(customer);
    // The subscription above will catch this and update local state
  };
  
  // Get current selected customer from model for the Listbox
  const selectedCustomer = CustomerListModel.selectedCustomer.value;
  
  console.log("Rendering - Selected customer ID:", selectedCustomerId);
  console.log("Rendering - Selected customer:", selectedCustomer);
  
  const hasNoData = !config.listbox.itemsprop.value || config.listbox.itemsprop.value.length === 0;
  
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
          <Textbox
            label=""
            noLabel={true}
            value={searchTextLocal}
            onChange={handleSearchInputChange}
            onBlur={(value) => CustomerListHandler.onSearchInputChange(value)}
            placeholder={config.searchInput.placeholderprop}
          />
        </div>
        
        <button
          onClick={() => CustomerListHandler.onSearchClick()}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          {config.searchButton.labelprop}
        </button>
      </div>
      
      {/* Listbox - KEY includes selectedCustomerId to force re-render on selection */}
      <div className="mb-6">
        <Listbox
          key={`${dataVersion}-${selectedCustomerId}`}  // ← CRITICAL: Forces re-render when selection changes!
          title={config.listbox.titleprop}
          items={config.listbox.itemsprop.value}
          selectedItem={selectedCustomer}
          onSelectItem={handleSelectCustomer}
          renderItem={(customer) => (
            <div>
              <div className="font-bold text-gray-800">{customer.name}</div>
              <div className="text-sm text-gray-500">{customer.email}</div>
              <div className="text-xs text-gray-400">Age: {customer.age}</div>
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
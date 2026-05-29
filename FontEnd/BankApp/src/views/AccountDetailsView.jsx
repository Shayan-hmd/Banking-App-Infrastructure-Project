import React, { useState, useEffect } from 'react';
import { AccountDetailsModel, AccountDetailsConfig, AccountDetailsHandler } from '../stores/appStore';
import Table from '../components/Table';

export default function AccountDetailsView() {
  const [rerender, setRerender] = useState(0);
  const [localData, setLocalData] = useState([]);
  const config = AccountDetailsConfig.componentProps;
  
  useEffect(() => {
    // Subscribe to data changes
    const unsubData = config.table.dataprop.subscribe((newValue) => {
      console.log("Account data changed in model:", newValue);
      setLocalData(newValue || []);
      setRerender(r => r + 1);
    });
    
    // ✅ ADD THIS: Subscribe to selectedAccount changes if you have it
    // If you don't have a selectedAccount in model, you can use local state
    // For now, just use local state for selected row
    
    setLocalData(config.table.dataprop.value || []);
    
    return () => unsubData();
  }, []);
  
  // Local state for selected account (since you might not have it in model)
  const [selectedAccount, setSelectedAccount] = useState(null);
  
  // Handle row click
  const handleRowClick = (row) => {
    console.log("Selected account:", row);
    setSelectedAccount(row);  // Update local state
    AccountDetailsHandler.onRowClick(row);
  };
  
  if (config.table.isLoadingprop?.value) {
    return (
      <div className="px-8 pb-8">
        <div className="text-center text-gray-600">Loading accounts...</div>
      </div>
    );
  }
  
  return (
    <div className="px-8 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {config.title.value}
      </h1>
      
      {config.table.errorprop?.value && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {config.table.errorprop.value}
        </div>
      )}
      
      
      
     
        <Table
          key={rerender}
          columns={config.table.columnsprop.value}
          data={localData}
          selectedRow={selectedAccount}  // Pass selected row
          onRowClick={handleRowClick}
        />
      
      
      <div className="mt-8">
        <button
          onClick={() => AccountDetailsHandler.onBackButtonClick()}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          {config.backButton.labelprop}
        </button>
      </div>
    </div>
  );
}
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
    
    setLocalData(config.table.dataprop.value || []);
    
    return () => unsubData();
  }, []);
  
  // Local state for selected account
  const [selectedAccount, setSelectedAccount] = useState(null);
  
  // Handle row click
  const handleRowClick = (row) => {
    console.log("Selected account:", row);
    setSelectedAccount(row);
    AccountDetailsHandler.onRowClick(row);
  };
  
  if (config.table.isLoadingprop?.value) {
    return (
      <div className="px-8 pb-8">
        <div className="text-center text-gray-600">Loading accounts...</div>
      </div>
    );
  }
  
  const hasNoData = !localData || localData.length === 0;
  
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
      
      {hasNoData && !config.table.isLoadingprop?.value && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg text-center mb-6">
          No account data available for this customer.
        </div>
      )}
      
      {!hasNoData && (
        <Table
          key={rerender}
          columns={config.table.columnsprop.value}
          data={localData}
          selectedRow={selectedAccount}
          onRowClick={handleRowClick}
        />
      )}
      
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
import React, { useState, useEffect } from 'react';
import { AccountDetailsConfig, AccountDetailsHandler } from '../stores/appStore';
import Table from '../components/Table';

export default function AccountDetailsView() {
  const [rerender, setRerender] = useState(0);
  const config = AccountDetailsConfig.componentProps;
  
  useEffect(() => {
    const unsub = config.table.dataprop.subscribe(() => setRerender(r => r + 1));
    
    // Load accounts
    AccountDetailsHandler.loadAccounts();
    
    return () => unsub();
  }, []);
  
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
        columns={config.table.columnsprop.value}
        data={config.table.dataprop.value}
        onRowClick={AccountDetailsHandler.onRowClick}
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
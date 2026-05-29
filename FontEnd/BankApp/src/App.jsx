import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { subscribeToView, getCurrentView } from './core/ViewManager';
import HomeView from './views/HomeView';
import CustomerListView from './views/CustomerListView';
import CustomerDetailsView from './views/CustomerDetailsView';
import AccountDetailsView from './views/AccountDetailsView';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState(getCurrentView());

  useEffect(() => {
    const unsubscribe = subscribeToView((view) => {
      setCurrentView(view);
    });
    return unsubscribe;
  }, []);

  const renderView = () => {
    switch (currentView?.name) {
      case 'CustomerList':
        return <CustomerListView />;
      case 'CustomerDetails':
        return <CustomerDetailsView />;
      case 'AccountDetails':
        return <AccountDetailsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-green-100">
      <Navbar />
      <div className="pt-20">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
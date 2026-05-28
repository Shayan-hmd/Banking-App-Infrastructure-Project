import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Textbox from '../components/TextBox'
import Listbox from '../components/ListBox'

export default function CustomerList() {
  const navigate = useNavigate()
  const [customerData, setCustomerData] = useState({
    name: ''
  })
  
  // Sample customer data
  const customersList = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 30, identity: "12345-6789012-3" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25, identity: "23456-7890123-4" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35, identity: "34567-8901234-5" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", age: 28, identity: "45678-9012345-6" }
  ]

  const handleInputChange = (field, value) => {
    setCustomerData({
      ...customerData,
      [field]: value
    })
  }

  const handleSearch = () => {
    console.log("Searching for:", customerData.name)
  }

  const handleSelectCustomer = (customer) => {
    console.log("Selected customer:", customer)
    // Navigate to customer details and pass the selected customer data
    navigate('/customer-details', { state: { customer } })
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleDetails = () => {
    // This will use the currently selected customer
    // You might want to store selected customer in state
    navigate('/customer-details')
    console.log("Show details for selected customer")
  }

  return (
    <div className="px-8 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Customer List
      </h1>
      
      {/* Search Row */}
      <div className="flex gap-4 mb-6">
        <div className="flex-grow">
          <Textbox 
            label=""
            noLabel={true} 
            value={customerData.name}
            onChange={(value) => handleInputChange('name', value)}
            placeholder="Search by customer name"
          />
        </div>
        
        <button 
          onClick={handleSearch}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold px-8 rounded-lg text-lg transition duration-300 whitespace-nowrap"
        >
          Search
        </button>
      </div>
      
      {/* Listbox Row */}
      <div className="mb-6">
        <Listbox 
          items={customersList}
          onSelectItem={handleSelectCustomer}
          renderItem={(customer) => (
            <div>
              <div className="font-bold text-gray-800">{customer.name}</div>
              <div className="text-sm text-gray-500">{customer.email}</div>
            </div>
          )}
        />
      </div>
      
      {/* Buttons at bottom */}
      <div className="flex justify-between items-center">
        <button 
          onClick={handleBack}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Back
        </button>
        
        <button 
          onClick={handleDetails}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Details
        </button>
      </div>
    </div>
  )
}
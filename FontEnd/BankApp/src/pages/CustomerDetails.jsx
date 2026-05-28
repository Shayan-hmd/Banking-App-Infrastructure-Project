import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Textbox from '../components/TextBox'

export default function CustomerDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedCustomer = location.state?.customer

  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    age: '',
    identityNumber: ''
  })

  // Load customer data if coming from customer list
  useEffect(() => {
    if (selectedCustomer) {
      setCustomerData({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        age: selectedCustomer.age,
        identityNumber: selectedCustomer.identity
      })
    }
  }, [selectedCustomer])

  const handleInputChange = (field, value) => {
    setCustomerData({
      ...customerData,
      [field]: value
    })
  }

  const handleBack = () => {
    navigate('/customer-list')
  }

  const handleAccountDetails = () => {
    console.log("Customer Data:", customerData)
    navigate('/account-details')
  }

  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Customer Details
      </h1>
      
      {/* First row: Name and Email side by side */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <Textbox 
          label="Customer Name" 
          value={customerData.name}
          onChange={(value) => handleInputChange('name', value)}
          placeholder="Enter customer name"
        />
        
        <Textbox 
          label="Customer Email" 
          value={customerData.email}
          onChange={(value) => handleInputChange('email', value)}
          type="email"
          placeholder="Enter customer email"
        />
      </div>

      {/* Second row: Age and Identity Number side by side */}
      <div className="grid grid-cols-2 gap-6">
        <Textbox 
          label="Customer Age" 
          value={customerData.age}
          onChange={(value) => handleInputChange('age', value)}
          type="number"
          placeholder="Enter customer age"
        />
        
        <Textbox 
          label="Identity Number" 
          value={customerData.identityNumber}
          onChange={(value) => handleInputChange('identityNumber', value)}
          placeholder="Enter identity number"
        />
      </div>

      {/* Buttons at bottom */}
      <div className="flex justify-between items-center mt-12">
        <button 
          onClick={handleBack}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Back
        </button>
        
        <button 
          onClick={handleAccountDetails}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Customer Account Details
        </button>
      </div>
    </div>
  )
}
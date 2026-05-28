import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const handleCustomerDetails = () => {
    navigate('/customer-list')
  }

  const handleAccountDetails = () => {
    navigate('/account-details')
  }

  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Main Menu
      </h1>
      
      <div className="flex items-center justify-center gap-20 mt-20">
        <button 
          onClick={handleAccountDetails}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300"
        >
          Account Details
        </button>
        <button 
          onClick={handleCustomerDetails}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300"
        >
          Customer Details
        </button>
      </div>
    </div>
  )
}
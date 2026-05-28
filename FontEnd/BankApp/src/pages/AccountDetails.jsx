import React from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../components/Table'

export default function AccountDetails() {
  const navigate = useNavigate()
  
  // Sample account data
  const accountData = [
    { id: 1, accountNumber: "PK36 1234 5678 9012 3456", accountType: "Savings", balance: "$5,000 USD", branch: "Main Branch" },
    { id: 2, accountNumber: "PK36 8765 4321 0987 6543", accountType: "Current", balance: "$12,500 USD", branch: "City Branch" },
    { id: 3, accountNumber: "PK36 5555 6666 7777 8888", accountType: "Business", balance: "$25,000 USD", branch: "Business Center" },
    { id: 4, accountNumber: "PK36 9999 0000 1111 2222", accountType: "Savings", balance: "$3,200 USD", branch: "Main Branch" }
  ]

  // Define columns dynamically
  const columns = [
    { header: "Account Number", accessor: "accountNumber" },
    { header: "Account Type", accessor: "accountType" },
    { header: "Balance", accessor: "balance" },
    { header: "Branch", accessor: "branch" }
  ]

  const handleRowClick = (row) => {
    console.log("Selected account:", row)
    // Add your logic here
  }

  const handleBack = () => {
    navigate(-1) // Goes back to previous page
  }

  return (
    <div className="px-8 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Account Details
      </h1>
      
      {/* Table Component */}
      <Table 
        columns={columns}
        data={accountData}
        onRowClick={handleRowClick}
      />
      
      {/* Back Button at Bottom Left */}
      <div className="mt-8">
        <button 
          onClick={handleBack}
          className="bg-green-900 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  )
}
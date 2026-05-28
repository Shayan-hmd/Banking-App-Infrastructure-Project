import React from 'react'

export default function Textbox({ label, value, onChange, type = "text", placeholder = "", noLabel = false }) {
  return (
    <div className={`flex items-center gap-4 w-full ${!noLabel ? 'py-3 border-b border-gray-200' : ''}`}>
      {!noLabel && (
        <div className="w-48 font-bold text-gray-700">
          {label}:
        </div>
      )}
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-900 bg-white text-gray-900"
      />
    </div>
  )
}
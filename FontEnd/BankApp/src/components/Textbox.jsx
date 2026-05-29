import React from 'react'

export default function Textbox({ label, value, onChange, onBlur, type = "text", placeholder = "", noLabel = false, disabled = false }) {
  return (
    <div className={`flex items-center gap-4 w-full ${!noLabel ? 'py-3 border-b border-gray-200' : ''}`}>
      {!noLabel && (
        <div className={`w-48 font-bold ${disabled ? 'text-gray-700' : 'text-gray-700'}`}>
          {label}:
        </div>
      )}
      <input 
        type={type}
        value={value || ""}
        onChange={(e) => !disabled && onChange && onChange(e.target.value)}
        onBlur={(e) => !disabled && onBlur && onBlur(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none transition duration-200 ${
          disabled 
            ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-white border-gray-300 focus:border-green-900 text-gray-900'
        }`}
      />
    </div>
  )
}
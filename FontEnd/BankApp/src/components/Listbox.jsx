import React from 'react'

export default function Listbox({ title, items, onSelectItem, renderItem, maxHeight = "400px" }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {title && (
        <div className="bg-green-900 text-white px-6 py-3">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      )}
      
      <div 
        className="divide-y divide-gray-200 overflow-y-auto"
        style={{ maxHeight: maxHeight }}
      >
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectItem && onSelectItem(item)}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition duration-200"
            >
              {renderItem ? renderItem(item) : (
                <div className="text-gray-800">{item}</div>
              )}
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            No items available
          </div>
        )}
      </div>
    </div>
  )
}
import React from 'react'

export default function Listbox({ title, items, onSelectItem, renderItem, maxHeight = "244px", selectedItem = null }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {title && (
        <div className="bg-green-900 text-white px-6 py-3">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      )}
      
      {/* ONLY CHANGE: Added fixed maxHeight and overflow-y-auto */}
      <div 
        className="divide-y divide-gray-200 overflow-y-auto"
        style={{ maxHeight: maxHeight }}
      >
        {items && items.length > 0 ? (
          items.map((item, index) => {
            // Check if this item is selected
            const isSelected = selectedItem && selectedItem.customerId === item.customerId;
            
            return (
              <div
                key={index}
                onClick={() => onSelectItem && onSelectItem(item)}
                className={`px-6 py-4 cursor-pointer transition duration-200 ${
                  isSelected 
                    ? 'bg-green-300 border-l-4 border-green-900'  // Highlight selected row
                    : 'hover:bg-gray-50'                          // Hover effect for non-selected
                }`}
              >
                {renderItem ? renderItem(item) : (
                  <div className="text-gray-800">{item}</div>
                )}
              </div>
            );
          })
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            No items available
          </div>
        )}
      </div>
    </div>
  )
}
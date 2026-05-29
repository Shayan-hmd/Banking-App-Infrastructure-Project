import React from 'react'

export default function Table({ columns, data, onRowClick }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-green-900 text-white">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((column, index) => (
            <div key={index} className="px-6 py-3 font-bold text-left">
              {column.header}
            </div>
          ))}
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {data && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`grid ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
            >
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="px-6 py-4 text-gray-800">
                  {row[column.accessor]}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            No data available
          </div>
        )}
      </div>
    </div>
  )
}
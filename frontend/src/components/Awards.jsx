import React, { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

export function AwardSection() {
  const { fields, append } = useFieldArray({ name: 'awards' })

  const handleAdd = () => {
    append({
      title: '',
      date: '',
      awarder: '',
      summary: ''
    })
  }

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Honors & Awards</h2>
      
      {fields.length > 0 && (
        <Fragment>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input
              name="headings.awards"
              placeholder="Awards"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <hr className="my-4 border-gray-200" />
        </Fragment>
      )}
      
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Award Name</label>
            <input
              name={`awards.${index}.title`}
              placeholder="Supreme hacker"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Award Date</label>
            <input
              name={`awards.${index}.date`}
              placeholder="May 2015"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Awarder</label>
            <input
              name={`awards.${index}.awarder`}
              placeholder="HackNY"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <input
              name={`awards.${index}.summary`}
              placeholder="Recognized for creating the most awesome project at a hackathon."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <hr className="my-4 border-gray-200" />
        </Fragment>
      ))}
      
      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        + Add Award
      </button>
    </div>
  )
}
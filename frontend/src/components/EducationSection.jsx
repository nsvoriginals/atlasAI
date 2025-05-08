import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

export function EducationSection() {
  const { fields, append } = useFieldArray({ name: 'education' })

  const handleAdd = () => {
    append({
      institution: '',
      studyType: '',
      area: '',
      startDate: '',
      endDate: ''
    })
  }

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Your Educational Background</h2>
      
      {fields.length > 0 && (
        <Fragment>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input
              name="headings.education"
              placeholder="Education"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <hr className="my-4 border-gray-200" />
        </Fragment>
      )}
      
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">School name</label>
            <input
              name={`education.${index}.institution`}
              placeholder="Rutgers University"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input
              name={`education.${index}.studyType`}
              placeholder="Bachelor's"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
            <input
              name={`education.${index}.area`}
              placeholder="Computer Science"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              name={`education.${index}.startDate`}
              placeholder="Sep 2015"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              name={`education.${index}.endDate`}
              placeholder="Jun 2019"
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
        + Add School
      </button>
    </div>
  )
}
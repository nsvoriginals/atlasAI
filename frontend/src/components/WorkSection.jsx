import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { Highlights } from './Highlights'

export function WorkSection() {
  const { fields, append } = useFieldArray({ name: 'work' })

  const handleAdd = () => {
    append({
      company: '',
      position: '',
      summary: '',
      startDate: '',
      endDate: '',
      highlights: []
    })
  }

  return (
    <div className="w-full px-8 pb-8">
      <h2 className="my-6 text-lg tracking-widest uppercase">Your Work Experience</h2>
      
      {fields.length > 0 && (
        <Fragment>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input
              name="headings.work"
              placeholder="Work"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <hr className="my-4 border-gray-200" />
        </Fragment>
      )}
      
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
            <input
              name={`work.${index}.company`}
              placeholder="Netflix"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              name={`work.${index}.position`}
              placeholder="Software Engineer"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <input
              name={`work.${index}.summary`}
              placeholder="lorem ipsum"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              name={`work.${index}.startDate`}
              placeholder="Sep 2015"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              name={`work.${index}.endDate`}
              placeholder="Jun 2019"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <Highlights
            label="Job Responsibilities"
            placeholder="Did cool stuff at company"
            name={`work.${index}.highlights`}
          />
          
          <hr className="my-4 border-gray-200" />
        </Fragment>
      ))}
      
      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        + Add Work Experience
      </button>
    </div>
  )
}
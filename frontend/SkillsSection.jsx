import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { Keywords } from './Keywords'

export function SkillsSection() {
  const { fields, append } = useFieldArray({ name: 'skills' })

  const handleAdd = () => {
    append({
      name: '',
      keywords: []
    })
  }

  return (
    <div className="w-full px-8 pb-8">
      <h2 className="my-6 text-lg tracking-widest uppercase">Your Skills</h2>
      
      {fields.length > 0 && (
        <Fragment>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input
              name="headings.skills"
              placeholder="Skills"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <hr className="my-4 border-gray-200" />
        </Fragment>
      )}
      
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill name</label>
            <input
              name={`skills.${index}.name`}
              placeholder="Programming Languages"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <Keywords
            label="Skill Details"
            placeholder="TypeScript"
            name={`skills.${index}.keywords`}
          />
          
          <hr className="my-4 border-gray-200" />
        </Fragment>
      ))}
      
      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        + Add Skill
      </button>
    </div>
  )
}
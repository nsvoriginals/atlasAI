import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { Keywords } from './Keywords'

export function ProjectsSection() {
  const { fields, append } = useFieldArray({ name: 'projects' })

  const handleAdd = () => {
    append({
      name: '',
      description: '',
      url: '',
      keywords: []
    })
  }

  return (
    <div className="w-full px-8 pb-8">
      <h2 className="my-6 text-lg tracking-widest uppercase">Your Projects</h2>
      
      {fields.length > 0 && (
        <Fragment>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input
              name="headings.projects"
              placeholder="Projects"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <hr className="my-4 border-gray-200" />
        </Fragment>
      )}
      
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              name={`projects.${index}.name`}
              placeholder="Piper Chat"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
            <input
              name={`projects.${index}.description`}
              placeholder="A video chat app with great picture quality."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Link to Project</label>
            <input
              name={`projects.${index}.url`}
              placeholder="http://piperchat.com"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <Keywords
            label="Tools Used"
            placeholder="TypeScript"
            name={`projects.${index}.keywords`}
          />
          
          <hr className="my-4 border-gray-200" />
        </Fragment>
      ))}
      
      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        + Add Project
      </button>
    </div>
  )
}
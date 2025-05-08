import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { MdClose, MdDragIndicator } from 'react-icons/md'

export function Highlights({ name, label, placeholder }) {
  const { fields, append, remove } = useFieldArray({ name })

  return (
    <div className="space-y-2">
      <label className="block">{label}</label>
      <div className="grid grid-cols-[auto,1fr,auto] gap-1 my-2">
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            <button 
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <MdDragIndicator />
            </button>
            <input 
              name={`${name}.${i}`} 
              placeholder={placeholder}
              className="w-full px-3 py-2 border rounded"
            />
            <button 
              type="button" 
              onClick={() => remove(i)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <MdClose />
            </button>
          </Fragment>
        ))}
        <div className="col-span-2">
          <FormInput onSubmit={append} />
        </div>
      </div>
    </div>
  )
}

// Simple FormInput replacement
function FormInput({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.elements.input.value
    if (value.trim()) {
      onSubmit(value)
      e.target.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        name="input"
        className="flex-1 px-3 py-2 border rounded-l"
        placeholder="Add new item..."
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  )
}
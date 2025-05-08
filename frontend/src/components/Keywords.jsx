import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

export function Keywords({ name, label, placeholder }) {
  const { getValues } = useFormContext()
  const { fields, append, remove } = useFieldArray({ name })

  return (
    <div className="space-y-2">
      <label className="block text-white mb-2">{label}</label>
      <FormInput onSubmit={append} placeholder={placeholder} />
      <div className="flex gap-1 my-2 flex-wrap">
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            <div className="inline-flex border rounded-full px-4 py-2 gap-1 items-center">
              <span>{getValues(`${name}.${i}`)}</span>
              <button 
                type="button" 
                onClick={() => remove(i)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <MdClose />
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

// Simple FormInput replacement
function FormInput({ onSubmit, placeholder }) {
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
        placeholder={placeholder}
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
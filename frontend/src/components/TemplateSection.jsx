import { useFormContext, Controller } from 'react-hook-form'

export function TemplatesSection() {
  const { control } = useFormContext()

  return (
    <div className="w-full px-8 pb-8">
      <h2 className="my-6 text-lg tracking-widest uppercase">Choose a Template</h2>
      <div className="flex flex-wrap gap-4">
        {TEMPLATES.map((templateId) => (
          <label key={templateId} className="inline-flex items-center p-2 border rounded cursor-pointer">
            <Controller
              control={control}
              name="selectedTemplate"
              render={({ field }) => (
                <input
                  type="radio"
                  className="mr-2"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={templateId}
                  checked={field.value === templateId}
                />
              )}
            />
            <span>Template {templateId}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
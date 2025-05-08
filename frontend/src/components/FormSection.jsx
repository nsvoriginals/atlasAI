export function FormSection({ title = '', children }) {
    return (
      <fieldset className="w-full px-8 pb-8">
        <h2 className="my-6 text-lg tracking-widest uppercase">
          {title}
        </h2>
        {children}
      </fieldset>
    )
  }
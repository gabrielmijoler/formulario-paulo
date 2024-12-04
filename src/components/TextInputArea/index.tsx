interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  value?: any
  required?: boolean
  naoRenderizarQuando?: boolean
  onChangeValue?: (newValue: any) => void
  height?: string
  width?: string
  placeholder?: string
}

export const TextAreaInput = (props: AuthInputProps) => {
  return props.naoRenderizarQuando ? null : (
    <div className="w-full mt-4">
      <label>{props.label}</label>
      <textarea
        value={props.value}
        onChange={(e) => props.onChangeValue?.(e.target.value)}
        required={props.required}
        placeholder={props.placeholder}
        className={`
            ${props.height ? `h-${props.height}` : 'h-24'} 
            ${props.width ? `w-${props.width}` : 'w-full'} 
            block p-2.5 rounded-lg bg-gray-200 mt-2
            border-2 focus:border-blue-500 focus:bg-white
            focus:outline-none text-black 
          `}
      />
    </div>
  )
}

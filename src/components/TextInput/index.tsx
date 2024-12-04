interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value?: any
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'submit' | 'date'
  naoRenderizarQuando?: boolean
  onChangeValue?: (newValue: any) => void
  height?: string
  width?: string
  placeholder?: string
}

export const TextInput = (props: AuthInputProps) => {
  return props.naoRenderizarQuando ? null : (
    <div className="flex flex-col mt-4 w-full">
      <label>{props.label}</label>

      <input
        type={props.type ?? 'text'}
        value={props.value}
        onChange={(e) => props.onChangeValue?.(e.target.value)}
        required={props.required}
        placeholder={props.placeholder}
        className={`
            ${props.height ? `h-${props.height}` : 'h-12'} 
            ${props.width ? `w-${props.width}` : 'w-full'} 
            px-4 py-3 rounded-lg bg-gray-200 mt-2
            border-2 focus:border-blue-500 focus:bg-white
            focus:outline-none text-black 
          `}
      />
    </div>
  )
}

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'submit' | 'date'
  naoRenderizarQuando?: boolean
  height?: string
  width?: string
  placeholder?: string
}

export const TextInput = (props: AuthInputProps) => {
  return props.naoRenderizarQuando ? null : (
    <div className="flex flex-col mt-4 w-full">
      <input
        type={props.type ?? 'text'}
        name={props.name}
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

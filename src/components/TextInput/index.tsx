import React from 'react'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'submit' | 'date' | 'button'
  naoRenderizarQuando?: boolean
  height?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: string
  placeholder?: string
  label: string
}

export const TextInput: React.FC<AuthInputProps> = (props) => {
  if (props.naoRenderizarQuando) return null

  return (
    <div className="flex flex-col mt-4 w-full">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        type={props.type ?? 'text'}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
        name={props.name}
        id={props.name}
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

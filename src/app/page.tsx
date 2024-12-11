import { TextInput } from '@/components/TextInput'
import Logo from '@/components/template/Logo'
import { setCookie } from './actions'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  'use server'

  const { username, password } = Object.fromEntries(formData)
  console.log('username', username, password)

  const response = await fetch(
    'https://clinical-backend-ae40133038af.herokuapp.com/v1/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    },
  )
  if (response.ok) {
    // const { token } = await response.json()
    const data = await response.json()
    const token = data.token
    setCookie('authToken', token)
    redirect('/home')
  }
}
export default function Login() {
  return (
    <form
      className="flex h-screen items-center justify-center"
      action={loginAction}
    >
      <div className="hidden md:block"></div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="flex justify-center text-3xl font-bold mb-5">
          Entre com a sua conta
        </h1>
        <div className="flex items-center justify-center mb-8">
          <Logo />
        </div>
      </div>

      <TextInput
        placeholder="Email de usuário"
        type="email"
        name="username"
        required
      />
      <TextInput
        placeholder="Senha"
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />

      <button
        className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}
      >
        Entrar
      </button>
    </form>
  )
}

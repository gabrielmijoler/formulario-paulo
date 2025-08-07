import { TextInput } from '@/components/TextInput'
import Logo from '@/components/template/Logo'
import { setCookie } from './actions'
import { redirect } from 'next/navigation'
import { postLogin } from '@/services/clients'

export async function loginAction(formData: FormData) {
  'use server'

  const { username, password } = Object.fromEntries(formData)

  const payload = JSON.stringify({ username, password })
  const response = await postLogin(payload as any)

  if (response?.token) {
    setCookie('authToken', JSON.stringify(response))
    redirect('/home')
  }
}

export default function Login() {
  return (
    <form
      className="flex flex-col h-screen items-center justify-center"
      action={loginAction}
    >
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="flex justify-center text-3xl font-bold mb-5">
          Entre com a sua conta
        </h1>
        <div className="flex items-center justify-center mb-8">
          <Logo />
        </div>

        <TextInput
          placeholder="Email de usuário"
          type="email"
          name="username"
          required label={''} />
        <TextInput
          placeholder="Senha"
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />

        <button
          className="
          w-full bg-indigo-500 hover:bg-indigo-400
          text-white rounded-lg px-4 py-3 mt-6
        "
        >
          Entrar
        </button>
      </div>
    </form>
  )
}
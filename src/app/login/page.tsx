'use client'

import { useState } from 'react'

import { IconAtencao } from '@/components/icons'
// import Image from 'next/image'
// import useAuth from "@/data/hook/useAuth"
import { TextInput } from '@/components/TextInput'
import { Toast } from '@/components/Toast'
import { useAppData } from '@/context'
import { useRouter } from 'next/navigation'

export default function Autenticacao() {
  const { Login } = useAppData()
  const { errorMessage } = useAppData()

  const [erro, setErro] = useState(null)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const router = useRouter()

  function exibirErro(msg: any, tempoEmSegundos = 5) {
    setErro(msg)
    setTimeout(() => setErro(null), tempoEmSegundos * 1000)
  }

  async function submeter() {
    try {
      await Login(email, senha, { errorMessage })
      router.push('/')
    } catch (e) {
      exibirErro(e ?? 'Erro desconhecido!')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Toast item={errorMessage} />
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        {/* <Image
          src="https://source.unsplash.com/random"
          alt="Imagem da Tela de Autenticação"
          className="h-screen w-full object-cover"
        /> */}
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className={`text-3xl font-bold mb-5`}>Entre com a Sua Conta</h1>

        {erro ? (
          <div
            className={`
                        flex items-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-700 rounded-lg
                    `}
          >
            {IconAtencao()}
            <span className="ml-3">{erro}</span>
          </div>
        ) : (
          false
        )}

        <TextInput
          label="Email"
          type="email"
          value={email}
          onChangeValue={setEmail}
          required
        />
        <TextInput
          label="Senha"
          type="password"
          value={senha}
          onChangeValue={setSenha}
          required
        />

        <button
          onClick={submeter}
          className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}
        >
          {'Entrar'}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        {/* <button onClick={loginGoogle} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Entrar com Google
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Crie um Conta Gratuitamente</a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade?
                        <a onClick={() => setModo('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Entre com a suas Credenciais</a>
                    </p>
                )} */}
      </div>
    </div>
  )
}

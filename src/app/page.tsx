// 'use client'

// import { useState } from 'react'

// import { IconAtencao } from '@/components/icons'
// // import Image from 'next/image'
// // import useAuth from "@/data/hook/useAuth"
// import { TextInput } from '@/components/TextInput'
// import { Toast } from '@/components/Toast'
// import { useAppData } from '@/context'
// import { useRouter } from 'next/navigation'
// import Logo from '@/components/template/Logo'

// export default function Autenticacao() {
//   const { Login } = useAppData()
//   const router = useRouter()

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [isLoading, setLoading] = useState(false)

//   async function handleSubmit(e: any) {
//     e.preventDefault()
//     setError('')

//     if (!username || !password) {
//       setError('Por favor, preencha todos os campos.')
//       return
//     }

//     try {
//       setLoading(true)
//       await Login(username, password)
//       setTimeout(() => {
//       }, 2000)
//       router.push('/home')
//       setLoading(false)
//     } catch (error) {
//       const errorMessage =
//         (error as any)?.response?.data?.message || 'Ocorreu um erro ao logar.'
//       setError(errorMessage)
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex h-screen items-center justify-center">
//       <div className="hidden md:block"></div>
//       <div className="m-10 w-full md:w-1/2 lg:w-1/3">
//         <h1 className="flex justify-center text-3xl font-bold mb-5">
//           Entre com a sua conta
//         </h1>
//         <div className="flex items-center justify-center mb-8">
//           <Logo />
//         </div>

//         {error ? (
//           <div
//             className={`
//                         flex items-center
//                         bg-red-400 text-white py-3 px-5 my-2
//                         border border-red-700 rounded-lg
//                     `}
//           >
//             {IconAtencao()}
//             <span className="ml-3">{error}</span>
//           </div>
//         ) : (
//           false
//         )}

//         <TextInput
//           name="username"
//           placeholder="Email de usuário"
//           type="email"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <TextInput
//           name="password"
//           placeholder="Senha"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}  
//           autoComplete="current-password"
//           required
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className={`
//                     w-full bg-indigo-500 hover:bg-indigo-400
//                     text-white rounded-lg px-4 py-3 mt-6
//                 `}
//         >
//           {!isLoading ? 'Entrar' : 'Carregando...'}
//         </button>

//         <hr className="my-6 border-gray-300 w-full" />
//       </div>
//     </div>
//   )
// }

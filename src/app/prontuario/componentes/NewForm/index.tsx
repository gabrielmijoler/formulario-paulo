'use client'
import { PropsWithChildren, useActionState } from 'react'
import { addMedicalAction } from '../../service'

export default function NewForm(props: PropsWithChildren) {
  const [state, formAction] = useActionState(addMedicalAction, null)
  return (
    <form className="p-1" action={formAction}>
      {props.children}
    </form>
  )
}

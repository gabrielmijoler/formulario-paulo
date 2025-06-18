import { IClient } from '@/services/clients/types'
import React from 'react'

interface ClientInfoFieldsProps {
  client: IClient
  isVisible: boolean
}

export const ClientInfoFields: React.FC<ClientInfoFieldsProps> = ({
  client,
  isVisible,
}) => {
  if (!isVisible) return null

  const fields = [
    { key: 'name', value: client.name, label: 'Nome' },
    { key: 'document', value: client.document, label: 'Documento' },
    { key: 'address', value: client.address, label: 'Endereço' },
    { key: 'ieRg', value: client.ieRg, label: 'IE/RG' },
    { key: 'email', value: client.email, label: 'E-mail' },
    { key: 'telephone', value: client.telephone, label: 'Telefone' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 text-black mt-4">
      {fields.map(({ key, value, label }) => (
        <input
          key={key}
          type="text"
          value={value || ''}
          disabled
          placeholder={label}
          className="p-2 rounded disabled:bg-gray-400"
          aria-label={label}
        />
      ))}
    </div>
  )
}

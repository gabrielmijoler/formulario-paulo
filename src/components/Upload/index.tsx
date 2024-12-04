import React, { useCallback } from 'react'
import { DropzoneState, useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'

import { Box } from '../Box'
import { CloseIcon, FileIcon, UploadIcon } from '../icons'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  dropzone: DropzoneState
}

interface HasFilesProps {
  files: File[]
  removeFile: (index: number) => void
}

export const FileInput = () => {
  const { control, setValue, watch } = useFormContext()
  const files = watch('files')

  const removeFile = useCallback(
    (index: number) => {
      setValue(
        'files',
        files.filter((_: any, i: number) => i !== index),
      )
    },
    [files, setValue],
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('files', [...files, ...acceptedFiles])
    },
    [files, setValue],
  )

  const dropzone = useDropzone({
    onDrop,
    multiple: true,
  })

  return (
    <Controller
      name="files"
      control={control}
      render={({ field }) => (
        <Box direction="col" flexWrap="nowrap" gap="2">
          <Input
            dropzone={dropzone}
            onChange={(e) => field.onChange(Array.from(e.target.files || []))}
          />
          {files.length > 0 && (
            <HasFiles files={files} removeFile={removeFile} />
          )}
        </Box>
      )}
    />
  )
}

const Input = ({ dropzone }: InputProps) => {
  const { getRootProps, isDragActive } = dropzone

  return (
    <div
      {...getRootProps()}
      className={`w-auto h-auto rounded-lg border-dashed border-4 hover:border-blue-500 bg-gray-200 hover:bg-white transition-all my-3 p-1 
      ${isDragActive ? 'border-blue-500' : 'border-gray-500'}`}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer ">
        <div className="flex flex-row items-center justify-center">
          <UploadIcon
            className={`w-8 h-8 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          />
          {isDragActive ? (
            <p className="font-bold text-xs text-blue-400">
              Solte para adicionar
            </p>
          ) : (
            <p className="text-gray-400 text-xs">
              <span className="font-bold">Clique para enviar</span> ou arraste
              até aqui.
            </p>
          )}
        </div>
      </label>
      <input {...getRootProps()} className="hidden" />
    </div>
  )
}

const HasFiles = ({ files, removeFile }: HasFilesProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full rounded-lg border-2 border-gray-400 bg-gray-200 items-center gap-1">
      {files.map((file, index) => (
        <div
          key={index}
          className="w-auto h-auto bg-white rounded-md shadow-md flex gap-1 items-center justify-center mb-1"
        >
          <FileIcon className="w-5 h-5 ml-1" />
          <span className="text-sm text-gray-500 my-2 flex-1 truncate">
            {file.name}
          </span>
          <button type="button" onClick={() => removeFile(index)}>
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  )
}

import React from 'react'
import { useForm } from 'react-hook-form'

export interface IFileInputProp {
  file: FileList
}

interface IFileUploaderProps {
  onSubmit: (data: IFileInputProp) => void
}

const FileUploader = ({ onSubmit }: IFileUploaderProps) => {
  const { register, handleSubmit } = useForm<IFileInputProp>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-sm gap-4'>
      <input
        accept='image/png, image/gif, image/jpeg'
        type='file'
        {...register('file')}
        className='file-input file-input-bordered file-input-primary w-full max-w-sm'
      />

      <button type='submit' className='btn btn-primary'>
        Upload
      </button>
    </form>
  )
}

export default FileUploader

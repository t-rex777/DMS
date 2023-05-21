import React, { useEffect, useState } from 'react'
import AppLayout from '../AppLayout'
import { viewPlacementDetails } from '../api/placement'
import { useAuthState } from '../store/auth'
import { toast } from 'react-toastify'

interface IViewPlacementDetails {
  company_name: string
  ctc: string
  role: string
}

const StudentPlacement = () => {
  const { userId } = useAuthState()

  const [details, setDetails] = useState<IViewPlacementDetails[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    void (async () => {
      try {
        const {
          data: { result },
        } = await viewPlacementDetails(userId)
        if (result === false) {
          setError(true)
          throw new Error('Something went wrong')
        }
        if (result.length === 0) throw new Error('No placement record found!')
        setDetails(result)
      } catch (error) {
        toast.error(error.message)
      }
    })()
  }, [])

  return (
    <AppLayout>
      <div>
        <div className='mb-3 font-semibold text-3xl'>Placement</div>

        {error ? (
          <div>Somthing went wrong</div>
        ) : (
          <div className='flex flex-col gap-4'>
            {details.length > 0 ? (
              details.map(({ company_name, ctc, role }, index) => {
                return (
                  <div key={index}>
                    <div className='card w-full max-w-lg shadow-xl bg-slate-800 text-white'>
                      <div className='card-body'>
                        <h2 className='font-semibold'>Company Name - {company_name}</h2>
                        <h2 className='text-sm'>CTC - {ctc}</h2>
                        <h2 className='text-sm'>Role - {role}</h2>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div>No placement record found!</div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default StudentPlacement

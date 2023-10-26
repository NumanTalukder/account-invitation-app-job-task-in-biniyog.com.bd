import React, { useState } from 'react'
import { verifyEmail } from '../lib/apiService'
import Alert from './Alert'

const VerifyEmail = () => {
  const [pin, setPin] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // email verification is done here
  const handleVerify = async () => {
    try {
      const res = await verifyEmail(pin)

      // Handling the success
      if (res) {
        setSuccess('Registration Successful!')
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      }
    } catch (err) {
      setError('wrong pin')
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-1 max-w-md mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Verify Email</h1>
      <div className='flex items-center'>
        <input
          type='text'
          className='w-full p-2 border rounded'
          placeholder='PIN on your email'
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
      {success && (
        <Alert
          type='success'
          title={success}
          description='Registration is successful. Please Login to continue!'
        />
      )}
      {error && (
        <Alert
          type='error'
          title={error}
          description='you have inserted a wrong pin! please check your pin'
        />
      )}
    </div>
  )
}

export default VerifyEmail

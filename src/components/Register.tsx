import React, { useEffect, useState } from 'react'
import { Button, TextField, Typography, Link } from '@mui/material'
import { getToken, registerUser } from '../lib/apiService'
import Alert from './Alert'

function Register() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Check if already signed in
  useEffect(() => {
    const storedToken = getToken()
    if (storedToken) {
      window.location.href = '/user'
    }
  }, [])

  const handleRegister = async (e: any) => {
    e.preventDefault()

    if (!email || !firstName || !lastName || password || confirmPassword) {
      setError('All fields are necessary!')
      return
    }

    try {
      const res = await registerUser(
        email,
        firstName,
        lastName,
        password,
        confirmPassword
      )
      if (res) {
        setSuccess('Check your email for further instructions.')
        setTimeout(() => {
          window.location.href = '/verify-email'
        }, 2000)
      }
    } catch (err) {
      setError('Registration failed.')
      console.log(err)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-1 h-screen max-w-md mx-auto p-4'>
      <Typography variant='h4' className='font-bold mb-4'>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          type='text'
          variant='outlined'
          label='Email'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ height: '36px' }}
        />
        <TextField
          type='text'
          variant='outlined'
          label='First Name'
          fullWidth
          margin='normal'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ height: '36px' }}
        />
        <TextField
          type='text'
          variant='outlined'
          label='Last Name'
          fullWidth
          margin='normal'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ height: '36px' }}
        />
        <TextField
          type='password'
          variant='outlined'
          label='Password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ height: '36px' }}
        />
        <TextField
          type='password'
          variant='outlined'
          label='Retype Password'
          fullWidth
          margin='normal'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ height: '36px' }}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          style={{ marginTop: '1rem' }}
          sx={{ height: '36px' }}
        >
          Register
        </Button>
      </form>
      <Typography>
        Already have an account? <Link href='/'>Login</Link>
      </Typography>
      {error && (
        <Typography className='text-red-600 mt-2'>
          <Alert type='error' title='Failed to Register' description={error} />
        </Typography>
      )}
      {success && (
        <Typography className='text-green-600 mt-2'>
          <Alert type='success' title='User Created' description={success} />
        </Typography>
      )}
    </div>
  )
}

export default Register

import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Link as MUILink } from '@mui/material'
import { getToken, loginUser } from '../lib/apiService'
import Alert from './Alert'
import { Link } from 'react-router-dom'

interface LoginProps {
  saveToken: (token: string) => void
}

function Login({ saveToken }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Check if already signed in
  useEffect(() => {
    const storedToken = getToken()
    if (storedToken) {
      window.location.href = '/users'
    }
  }, [])

  const handleLogin = async () => {
    // check the input field
    if (!username || !password) {
      setError('All Fields Are Necessary!')
      return
    }

    try {
      const token = await loginUser(username, password)
      saveToken(token)

      if (token) {
        setSuccess('Login Successful!')
        setTimeout(() => {
          window.location.href = '/users'
        }, 1500)
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center max-w-md mx-auto h-screen gap-1 p-4'>
      <Typography variant='h4' className='font-bold text-center mb-4'>
        Login
      </Typography>
      <TextField
        type='text'
        variant='outlined'
        label='Username or Email'
        fullWidth
        margin='normal'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      <Button
        variant='contained'
        color='primary'
        fullWidth
        style={{ marginTop: '1rem' }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography>
        Don't have an account?{' '}
        <MUILink component={Link} to='/register'>
          Register
        </MUILink>
      </Typography>
      {error && (
        <Typography className='text-red-600 mt-2'>
          <Alert type='error' title='Login Failed' description={error} />
        </Typography>
      )}
      {success && (
        <Typography className='text-green-600 mt-2'>
          <Alert type='success' title='Logged In' description={success} />
        </Typography>
      )}
    </div>
  )
}

export default Login

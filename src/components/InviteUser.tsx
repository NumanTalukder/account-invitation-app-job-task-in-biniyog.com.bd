import React, { useEffect, useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { inviteUserToAccount } from '../lib/apiService'
import Alert from './Alert'

interface InviteUserProps {
  token: string | null
}

function InviteUser({ token }: InviteUserProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<number[]>([])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Check if the user is signed in
  useEffect(() => {
    if (!token) {
      window.location.href = '/'
      return
    }
  }, [token])

  // User Invite functionality
  const handleInvite = async () => {
    if (!token) {
      return
    }
    try {
      // does not return anything
      await inviteUserToAccount(token, email, role)
      setSuccess('Invitation Sent')
    } catch (err) {
      setError('Invitation failed.')
      console.log(err)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center max-w-md mx-auto h-screen gap-1 p-4'>
      <Typography variant='h4' className='font-bold text-center mb-4'>
        Invite User
      </Typography>
      <TextField
        type='email'
        variant='outlined'
        label='Email'
        fullWidth
        margin='normal'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ height: '36px' }}
      />
      <TextField
        type='number'
        variant='outlined'
        label='Role'
        fullWidth
        margin='normal'
        value={role}
        onChange={(e) => setRole([...role, parseInt(e.target.value, 10)])}
        sx={{ height: '36px' }}
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        style={{ marginTop: '1rem' }}
        onClick={handleInvite}
      >
        Invite
      </Button>
      {success && (
        <Alert
          type='success'
          title={success}
          description='Invitation was successfully sent!'
        />
      )}
      {error && (
        <Alert
          type='error'
          title={error}
          description='Failed to send invitation'
        />
      )}
    </div>
  )
}

export default InviteUser

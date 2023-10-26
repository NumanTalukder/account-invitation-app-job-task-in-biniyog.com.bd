import React, { useEffect, useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import { inviteUserToAccount } from '../lib/apiService'
import Alert from './Alert'

interface InviteUserProps {
  token: string | null
}

function InviteUser({ token }: InviteUserProps) {
  const [email, setEmail] = useState('')
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
      const res = await inviteUserToAccount(token, email)
      // Handle success
      if (res.ok) {
        setSuccess('Invitation Sent')
      } else {
        setError('Invitation failed!')
      }
    } catch (err) {
      setError('Invitation failed.')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-1 max-w-md mx-auto p-4 active:outline-none'>
      <h1 className='text-2xl font-bold mb-4'>Invite User</h1>
      <Box display='flex' alignItems='center'>
        <TextField
          type='email'
          variant='outlined'
          label="User's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ flex: 1, height: '100%' }}
        />
        <Button
          variant='contained'
          onClick={handleInvite}
          style={{ height: '100%' }}
        >
          Invite
        </Button>
      </Box>
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

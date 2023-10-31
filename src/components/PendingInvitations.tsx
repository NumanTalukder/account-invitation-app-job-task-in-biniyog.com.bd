import React, { useEffect, useState } from 'react'
import { listPendingInvitations } from '../lib/apiService'
import Alert from './Alert'
import { Typography } from '@mui/material'

interface InvitationsProps {
  token: string | null
}

function PendingInvitations({ token }: InvitationsProps) {
  const [invitations, setInvitations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      window.location.href = '/'
      return
    }

    const fetchInvitations = async () => {
      try {
        const inviteList = await listPendingInvitations(token)
        setInvitations(inviteList)
      } catch (err) {
        setError('Failed to fetch.')
      }
    }

    fetchInvitations()
  }, [token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-[400px] m-auto p-4'>
      <Typography variant='h4' className='font-bold mb-8'>
        Pending Invitations
      </Typography>
      {invitations?.map((invitation: any, index: number) => (
        <div
          key={index}
          className={
            index % 2 === 0
              ? 'bg-gray-100 w-full text-center hover:shadow-xl hover:scale-105 transition-all p-2'
              : 'bg-gray-200 w-full text-center hover:shadow-xl hover:scale-105 transition-all p-2'
          }
        >
          {invitation.emailInvitedTo}
        </div>
      ))}
      {error && (
        <p className='text-red-600 mt-2'>
          <Alert
            type='error'
            title={error}
            description='Failed to fetch pending invitations list'
          />
        </p>
      )}
    </div>
  )
}

export default PendingInvitations

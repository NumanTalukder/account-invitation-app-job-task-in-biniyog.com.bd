import React, { useEffect, useState } from 'react'
import { listUsersInAccount } from '../lib/apiService'
import Alert from './Alert'
import { Typography } from '@mui/material'
import DataTable from './DataTable'

interface UsersInAccountProps {
  token: string | null
}

function UsersInAccount({ token }: UsersInAccountProps) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  // fetch the user data
  useEffect(() => {
    if (!token) {
      return
    }

    const fetchUsers = async () => {
      try {
        const userList = await listUsersInAccount(token)
        setUsers(userList)
      } catch (err) {
        setError('Failed to fetch users.')
      }
    }

    fetchUsers()
  }, [token])

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-1 max-w-md mx-auto p-4'>
      <Typography variant='h4' className='font-bold mb-4'>
        Users in Account
      </Typography>

      {/* <DataTable users={users} */}

      {users?.map((user: any, index: number) => (
        <div
          key={index}
          className={
            index % 2 === 0
              ? 'bg-gray-100 w-full text-center hover:shadow-xl hover:scale-105 transition-all p-2'
              : 'bg-gray-200 w-full text-center hover:shadow-xl hover:scale-105 transition-all p-2'
          }
        >
          {user.email}
        </div>
      ))}

      {error && (
        <Alert
          type='error'
          title='Failed to fetch users'
          description='Failed to fetch users'
        />
      )}
    </div>
  )
}

export default UsersInAccount

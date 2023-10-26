import React from 'react'

const DataTable = (users: any) => {
  return (
    <div>
      {users?.map((user: any, index: number) => (
        <li
          key={index}
          className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
        >
          {user.email}
        </li>
      ))}
    </div>
  )
}

export default DataTable

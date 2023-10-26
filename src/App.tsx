import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import InviteUser from './components/InviteUser'
import { getToken, setToken } from './lib/apiService'
import VerifyEmail from './components/VerifyEmail'
import Navbar from './components/Navbar'
import LinearProgress from '@mui/material/LinearProgress'

//lazy loading
const UsersInAccount = React.lazy(() => import('./components/UsersInAccount'))
const PendingInvitations = React.lazy(
  () => import('./components/PendingInvitations')
)

function App() {
  const [token, setAppToken] = useState<string | null>(null)

  // Load the token from local storage on app start
  useEffect(() => {
    const storedToken = getToken()
    if (storedToken) {
      setAppToken(storedToken)
    }
  }, [])

  // Function to set the token in local storage and in the state
  const saveToken = (newToken: string) => {
    setToken(newToken)
    setAppToken(newToken)
  }

  return (
    <>
      <Navbar token={token} />
      <Routes>
        <Route path='/' element={<Login saveToken={saveToken} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/invite' element={<InviteUser token={token} />} />
        <Route
          path='/users'
          element={
            <React.Suspense fallback={<LinearProgress color='secondary' />}>
              <UsersInAccount token={token} />
            </React.Suspense>
          }
        />
        <Route
          path='/pending-invitations'
          element={
            <React.Suspense fallback={<LinearProgress color='secondary' />}>
              <PendingInvitations token={token} />
            </React.Suspense>
          }
        />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
    </>
  )
}

export default App

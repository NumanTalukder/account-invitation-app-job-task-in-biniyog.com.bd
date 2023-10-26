import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as MUILink,
} from '@mui/material'

interface NavbarProps {
  token: string | null
}

const Navbar = ({ token }: NavbarProps) => {
  // Sign Out function
  const SignOut = () => {
    window.localStorage.removeItem('Authorization')
    window.location.href = '/'
  }

  return (
    <AppBar position='static'>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' component={Link} to='/' color='inherit'>
          Biniyog
        </Typography>

        {token && ( // Display this div if signed in
          <div className='flex gap-6 '>
            <MUILink
              component={Link}
              to='/users'
              color='inherit'
              style={{ textDecoration: 'none' }}
            >
              Users in Account
            </MUILink>
            <MUILink
              component={Link}
              to='/invite'
              color='inherit'
              style={{ textDecoration: 'none' }}
            >
              Invite a User
            </MUILink>
            <MUILink
              component={Link}
              to='/pending-invitations'
              color='inherit'
              style={{ textDecoration: 'none' }}
            >
              Pending Invitations
            </MUILink>
          </div>
        )}
        {token ? (
          <Button
            variant='contained'
            style={{ backgroundColor: 'rgb(239, 68, 68)', color: 'white' }}
            onClick={SignOut}
          >
            Sign Out
          </Button>
        ) : (
          <MUILink component={Link} to='/' color='inherit'>
            <Button
              variant='contained'
              style={{
                backgroundColor: 'white',
                color: 'rgb(59 130 246)',
              }}
            >
              Sign In
            </Button>
          </MUILink>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

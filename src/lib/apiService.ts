import axios from 'axios'

// Function to set the token in local storage
export const setToken = (token: string) => {
  localStorage.setItem('Authorization', `Bearer ${token}`)
}

// Function to get the token from local storage
export const getToken = () => {
  return localStorage.getItem('Authorization')?.split(' ')[1]
}

// const base_URL = process.env.BASE_URL
const base_URL = 'https://dev.biniyog.com.bd'

// Function to make a login request and obtain the token
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${base_URL}/security/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await response.json()
    const token = data.access_token

    setToken(token)
    return token
  } catch (error) {
    throw new Error('Login failed. Check your credentials.')
  }
}

// Function to make a registration request
export const registerUser = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
) => {
  try {
    await fetch(`${base_URL}/security/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      }),
    })
    return true
  } catch (error) {
    throw new Error('Registration failed.')
  }
}

//Function to verify email
export const verifyEmail = async (pin: string) => {
  try {
    await fetch(`${base_URL}/security/auth/confirm-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pin,
      }),
    })
    return true
  } catch (error) {
    throw new Error('Wrong pin.')
  }
}

// Function to invite a user to an account
export const inviteUserToAccount = async (token: string, email: string) => {
  // Find accountId
  let userInfo_res = await fetch(`${base_URL}/security/auth/user-details`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await userInfo_res.json()
  const accountId = data.id

  try {
    const response = await fetch(
      `${base_URL}/security/accounts/${accountId}/invite-user`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          emailInvitedTo: email,
          rolesInvitedTo: 'manager',
        }),
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Invitation failed.')
  }
}

// Function to fetch the list of users in an account
export const listUsersInAccount = async (token: string) => {
  console.log(token)

  try {
    // Find accountId

    // trying through axio as failed to get data by fetch
    const userInfoResponse = await axios.get(
      `${base_URL}/security/auth/user-details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const accountId = userInfoResponse.data.id
    console.log(accountId)

    // Fetch Users in account
    // trying through axio as failed to get data by fetch
    const response = await axios.get(
      `${base_URL}/security/accounts/${accountId}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error('Failed to fetch users in the account.')
  }
}

// Function to fetch the list of pending invitations
export const listPendingInvitations = async (token: string) => {
  // Find accountId

  // trying through axio as failed to get data by fetch
  const userInfoResponse = await axios.get(
    `${base_URL}/security/auth/user-details`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const accountId = userInfoResponse.data.id
  console.log(accountId)

  // Fetch Pending users data
  try {
    // trying through axio as failed to get data by fetch
    const response = await axios.get(
      `${base_URL}/security/accounts/${accountId}/pending-invites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error('Failed to fetch pending invitations.')
  }
}

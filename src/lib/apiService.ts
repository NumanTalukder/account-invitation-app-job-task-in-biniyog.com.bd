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

// Function to invite user
export const inviteUserToAccount = async (
  token: string,
  email: string,
  role: number[]
) => {
  try {
    // Find account_uuid
    const userInfoRes = await axios.get(`${base_URL}/security/accounts/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const account_uuid = userInfoRes.data[0].uuid

    const response = await axios.post(
      `${base_URL}/security/accounts/${account_uuid}/invite-user`,
      {
        emailInvitedTo: email,
        rolesInvitedTo: role,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return response.data
  } catch (error) {
    throw new Error('Invitation failed.')
  }
}

// Function to fetch the list of users in an account
export const listUsersInAccount = async (token: string) => {
  try {
    // Find account_uuid

    // trying through axio as failed to get data by fetch
    const userInfoResponse = await axios.get(`${base_URL}/security/accounts/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const account_uuid = userInfoResponse.data[0].uuid

    // Fetch Users in account
    // trying through axio as failed to get data by fetch
    const response = await axios.get(
      `${base_URL}/security/accounts/${account_uuid}/users`,
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
  // Find account_uuid

  // trying through axio as failed to get data by fetch
  const userInfoResponse = await axios.get(`${base_URL}/security/accounts/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const account_uuid = userInfoResponse.data[0].uuid

  // Fetch Pending users data
  try {
    // trying through axio as failed to get data by fetch
    const response = await axios.get(
      `${base_URL}/security/accounts/${account_uuid}/pending-invites`,
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

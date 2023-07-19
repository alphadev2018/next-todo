import { LoginData } from "./slice"

export const sendLoginReq = async (data: LoginData): Promise<{
  success: boolean
  message?: string
}> => {
  const response = await fetch(
    '/api/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
  const result = await response.json()

  return result
}

export const sendLogoutReq = async (): Promise<{}> => {
  await fetch(
    '/api/logout',
    { method: 'DELETE' }
  )

  return true
}

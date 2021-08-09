import * as tokenService from './tokenService'

const BASE_URL = '/api/senators/'


export const createSenator = async (senator) => {
  try {
      const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${tokenService.getToken()}`
          },
          body: JSON.stringify(senator)
      }, { mode: 'cors' })
      const data = await res.json()
      return data
  } catch (error) {
      throw error
  }
}

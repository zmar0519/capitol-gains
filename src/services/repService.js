import * as tokenService from './tokenService'

const BASE_URL = '/api/reps/'


export const createRepresentative = async (rep) => {
  try {
      const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${tokenService.getToken()}`
          },
          body: JSON.stringify(rep)
      }, { mode: 'cors' })
      const data = await res.json()
      return data
  } catch (error) {
      throw error
  }
}

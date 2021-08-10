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

export function addRepToWatchlist(repData) {
    return fetch(`${BASE_URL}watchlist`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenService.getToken()}`}),
      body: JSON.stringify(repData),
    })
    .then(res => {
      // Valid login if res.ok
      if (res.ok) return res.json()
      throw new Error('Bad Credentials') 
    })
    .then(({ token }) => tokenService.setToken(token))
    .catch(err => {
      console.log(err)
    })
  }
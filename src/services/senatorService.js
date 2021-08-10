import * as tokenService from './tokenService'

const BASE_URL = '/api/senators/'


export function addSenToWatchlist(senData) {
    return fetch(`${BASE_URL}watchlist`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenService.getToken()}`}),
      body: JSON.stringify(senData),
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
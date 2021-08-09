import * as tokenService from './tokenService'
const BASE_URL = '/api/watchlist/'

export const createWatchlist = async (watchlistId, watchlist) => {
  try {
      const res = await fetch(`${BASE_URL}${watchlistId}`, {
          method: "POST",
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${tokenService.getToken()}`
          },
          body: JSON.stringify(watchlist)
      }, { mode: "cors" })
      const data = await res.json()
      return data
  } catch (error) {
      throw error
  }
}
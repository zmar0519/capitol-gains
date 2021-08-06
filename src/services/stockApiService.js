// import * as tokenService from '../services/tokenService';
const BASE_URL = '/api/stocks/'


export function findRange(date1, date2, ticker) {
  return fetch(`${BASE_URL}/findRange/${date1}/${date2}/${ticker}`, {
    // headers: {
    //   'Authorization': `Bearer ${tokenService.getToken()}`
    // },
  }, {mode: "cors"})
  .then(res => res.json())
}
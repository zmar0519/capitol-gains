import * as tokenService from "./tokenService"

const BASE_URL = "/api/reps/"

export function addRepToWatchlist(repData) {
	return fetch(`${BASE_URL}watchlist`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${tokenService.getToken()}`,
		},
		body: JSON.stringify(repData),
	})
		.then((res) => {
			// Valid login if res.ok
			return res.json()
		})
		.then(({ token }) => tokenService.setToken(token))
		.catch((err) => {
			console.log(err)
		})
}
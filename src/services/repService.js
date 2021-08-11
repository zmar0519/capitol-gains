import * as tokenService from "./tokenService"

const BASE_URL = "/api/reps/"

export function addRepToWatchlist(repData) {
	return fetch(`${BASE_URL}watchlist`, {
		method: "POST",
		headers: new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${tokenService.getToken()}`,
		}),
		body: JSON.stringify(repData),
	})
		.then((res) => {
			// Valid login if res.ok
			if (res.ok) return res.json()
			throw new Error("Bad Credentials")
		})
		.then(({ token }) => tokenService.setToken(token))
		.catch((err) => {
			console.log(err)
		})
}

export const deleteFollowing = async (repId) => {
	try {
		await fetch(
			`${BASE_URL}${repId}`,
			{
				method: "DELETE",
				headers: { Authorization: "Bearer " + tokenService.getToken() },
			},
			{ mode: "cors" }
		)
	} catch (error) {
		throw error
	}
}
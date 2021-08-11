import * as tokenService from "./tokenService"

const BASE_URL = "/api/users"

function getAllUsers() {
	return fetch(
		BASE_URL,
		{ headers: { Authorization: `Bearer ${tokenService.getToken()}` } },
		{ mode: "cors" }
	).then((res) => res.json())
}

export const deleteFollowing = (repId) => {
	try {
		return fetch(
			`${BASE_URL}/${repId}`,
			{
				method: "DELETE",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenService.getToken()}`,
				}),
			},
			{ mode: "cors" }
		)
		.then((res) => {
			if (res.ok) return res.json()
			throw new Error("Bad Credentials")
		})
		.then(({ token }) => tokenService.setToken(token))
	} catch (error) {
		throw error
	}
}

export { getAllUsers }

import * as tokenService from "./tokenService"

const BASE_URL = "/api/posts/"

export const createFollowing = async (post) => {
	try {
		const res = await fetch(
			BASE_URL,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${tokenService.getToken()}`,
				},
				body: JSON.stringify(post),
			},
			{ mode: "cors" }
		)
		const data = await res.json()
		return data
	} catch (error) {
		throw error
	}
}

export const updateFollowing = async (postId) => {
	try {
		const res = await fetch(
			`${BASE_URL}${postId}`,
			{
				method: "PUT",
				headers: {
					"content-type": "application/json",
					Authorization: "Bearer " + tokenService.getToken(),
				},
			},
			{ mode: "cors" }
		)
		const data = await res.json()
		return data
	} catch (error) {
		throw error
	}
}

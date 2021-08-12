import * as tokenService from "./tokenService"

const BASE_URL = "/api/users"

function getAllUsers() {
	return fetch(
		BASE_URL,
		{ headers: { Authorization: `Bearer ${tokenService.getToken()}` } },
		{ mode: "cors" }
	).then((res) => res.json())
}

function updateProfile(id, newUserData) {
	console.log(id);
	return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { 
		'content-type': 'application/json',
		'Authorization': `Bearer ${tokenService.getToken()}` },
    body: JSON.stringify(newUserData),
  })
  	.then((res) =>{
			console.log("res in the service", res)
		  return res.json()
	  })
		.then(({ token }) => tokenService.setToken(token))

		.catch((err)=>{
		console.log(err)
	})
}
export { getAllUsers, updateProfile }


export const deleteFollowing = (repId) => {
	try {
		return fetch(
			`${BASE_URL}/reps/${repId}`,
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

export const deleteFollowingSen = (senId) => {
	try {
		return fetch(
			`${BASE_URL}/senators/${senId}`,
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

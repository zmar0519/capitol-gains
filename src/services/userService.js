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
		  return res.json()
	  })
	.catch((err)=>{
		console.log(err)
	})
}
export { getAllUsers, updateProfile }

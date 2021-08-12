import { User } from "../models/user.js"

function index(req, res) {
	console.log(req.user)
	User.find({}).then((users) => res.json(users))
}

const update = async (req, res) => {
	console.log(req.user)
	try{
	const updatedUser = await User.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)
	return res.status(200).json(updatedUser)
} catch (error) {
	throw error
}
}

export { index, update }

import { User } from "../models/user.js"
import { createJWT } from "./auth.js"


function index(req, res) {
	console.log(req.user)
	User.find({})
	.populate("senators")
	.populate("reps")
	.then((users) => res.json(users))
}

const update = async (req, res) => {
	console.log(req.body)
	try{
	const updatedUser = await User.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
		).populate("reps").populate("senators")
		updatedUser.save()
		const token = createJWT(updatedUser)

		return res.status(200).json({token})
} catch (error) {
	throw error
}
}

export { index, update }

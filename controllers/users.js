import { User } from "../models/user.js"

function index(req, res) {
	console.log(req.user)
	User.find({})
	.populate("senators")
	.populate("reps")
	.then((users) => res.json(users))
}

export { index }

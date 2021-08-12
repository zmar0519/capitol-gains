import { Rep } from "../models/rep.js"
import { User } from "../models/user.js"
import { createJWT } from "./auth.js"

export { addToWatchlist, deleteFollowing }

function deleteFollowing(req, res) {
	User.findById(req.user._id)
	.populate("reps")
	.populate("senators")
	.then((user) => {
		user.reps = user.reps.filter(rep => !rep._id.equals(req.params.id))
		user.save()
		const token = createJWT(user)
		res.json({ token })
	})
}

function addToWatchlist(req, res) {
	Rep.findOne({ name: req.body.name })
		.then((representative) => {
			if (representative) {
				return representative._id
			}
			const rep = new Rep(req.body)
			rep.save()
			return rep._id
		})
		.then((repId) => {
			User.findById(req.user._id)
			.populate("reps")
			.populate("senators")
			.then((user) => {
				if (user.reps.includes(repId) === false) {
					user.reps.push(repId)
					user.save()
					const token = createJWT(user)
					res.json({ token })
				}
				return
			})
		})
}
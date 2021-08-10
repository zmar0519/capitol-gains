
import {Senator} from "../models/senator.js"
import { User } from "../models/user.js"
import { createJWT } from "./auth.js"

export {
  create,
  addToWatchlist,
}

const create = async (req, res) => {
  console.log(req.body)
  try {
      const senator = await new Senator(req.body)
      await senator.save()
      return res.status(201).json(senator)
  } catch (err) {
      return res.status(500).json({ err: err.message })
  }
}

function addToWatchlist (req, res) {
  Senator.findOne({name:req.body.name})
  .then(senator => {
    if (senator) {
      return senator._id
    }
    const sen = new Senator(req.body)
    sen.save()
    return sen._id
  })
  .then(senId => {
    User.findById(req.user._id)
    .then(user => {
      user.senators.push(senId)
      user.save()
      const token = createJWT(user)
        res.json({ token })
    }
    )
  })
}
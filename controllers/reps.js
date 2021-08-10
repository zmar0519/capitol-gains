import {Rep} from "../models/rep.js"
import { User } from "../models/user.js"
import { createJWT } from "./auth.js"

export {
  create,
  addToWatchlist,
}

function addToWatchlist (req, res) {
  Rep.findOne({name:req.body.name})
  .then(representative => {
    if (representative) {
      return representative._id
    }
    const rep = new Rep(req.body)
    rep.save()
    return rep._id
  })
  .then(repId => {
    User.findById(req.user._id)
    .then(user => {
      if(user.reps.includes(repId) === false){
        user.reps.push(repId)
        user.save()
        const token = createJWT(user)
          res.json({ token })        
      }
      return
    })
  })
}


const create = async (req, res) => {
  console.log(req.body)
  try {
      const representative = await new Rep(req.body)
      await representative.save()
      return res.status(201).json(representative)
  } catch (err) {
      return res.status(500).json({ err: err.message })
  }
}

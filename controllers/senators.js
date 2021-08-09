
import {Senator} from "../models/senator.js"

export {
  create
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

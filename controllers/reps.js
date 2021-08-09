import {Rep} from "../models/rep.js"

export {
  create
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

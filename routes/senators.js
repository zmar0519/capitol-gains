import { Router } from 'express'
import * as senatorsCtrl from "../controllers/senators.js"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()



/*---------- Public Routes -----------*/

router.post("/create", senatorsCtrl.create)


/*---------- Protected Routes ----------*/



export {
  router
}
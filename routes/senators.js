import { Router } from 'express'
import * as senatorsCtrl from "../controllers/senators.js"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()



/*---------- Public Routes -----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/watchlist", checkAuth, senatorsCtrl.addToWatchlist)



export {
  router
}
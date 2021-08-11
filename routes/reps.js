import { Router } from "express"
import * as repsCtrl from "../controllers/reps.js"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

const router = Router()

/*---------- Public Routes -----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/watchlist", checkAuth, repsCtrl.addToWatchlist)
router.delete('/ , checkAuth, repsCtrl.deleteFollowing')

export { router }

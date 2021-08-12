import { Router } from "express"
import * as usersCtrl from "../controllers/users.js"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

const router = Router()

// ========= Public Routes =========

// /*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get("/", checkAuth, usersCtrl.index)
router.put("/:id", checkAuth, usersCtrl.update)

export { router }

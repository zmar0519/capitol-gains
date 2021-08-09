import { Router } from 'express'
import * as stocksCtrl from '../controllers/stocks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


export {
  router
}

const router = Router()

router.get("/findRange/:date1/:date2/:ticker", stocksCtrl.findRange)
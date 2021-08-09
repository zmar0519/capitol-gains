import "dotenv/config.js"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import logger from "morgan"
import cors from "cors"

import { router as usersRouter } from "./routes/users.js"
import { router as authRouter } from "./routes/auth.js"
import { router as stocksRouter } from "./routes/stocks.js"
import { router as repsRouter } from "./routes/reps.js"
import { router as senatorsRouter } from "./routes/senators.js"

import "./config/database.js"

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/stocks", stocksRouter)
app.use("/api/reps", repsRouter)
app.use("/api/senators", senatorsRouter)

app.get("/*", function (req, res) {
	res.sendFile(
		path.dirname(fileURLToPath(import.meta.url), "build", "index.html")
	)
})

const port = process.env.PORT || 3001

app.listen(port, () => {
	console.log(`Express is listening on port ${port}.`)
})
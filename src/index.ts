import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'
import cors from 'cors'
import { router } from "./routes";

const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		return res.status(400).json({ error: err.message })
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server error'
	})
})

app.listen(PORT, () => {
	console.log("Server listening at " + PORT)
})

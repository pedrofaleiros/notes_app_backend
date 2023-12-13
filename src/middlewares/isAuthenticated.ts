import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
	sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization
	
	if (authToken) {
		const [, token] = authToken.split(' ')
		try {
			const jwtSecret = process.env.JWT_SECRET
			if (jwtSecret == undefined) {
				throw new Error('Erro no servidor')
			}
			const { sub } = verify(
				token,
				jwtSecret
			) as Payload
			req.user_id = sub
			return next()
		} catch (e) {
			return res.status(401).end()
		}
	}

	return res.status(401).end()
}
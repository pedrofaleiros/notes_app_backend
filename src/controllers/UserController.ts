import { Request, Response } from "express";
import { UserRequest } from "../models/user/UserRequest";
import { UserService } from "../services/UserService";
import { UserResponse } from "../models/user/UserResponse";
import { AuthUserResponse } from "../models/user/AuthUserResponse";

class UserController {

	async createUser(req: Request, res: Response) {
		const service = new UserService()
		const user = UserRequest.fromRequestBody(req.body)

		const response = await service.createUser(user)
		return res.json(response)
	}

	async authUser(req: Request, res: Response) {
		const service = new UserService()
		const user = UserRequest.fromRequestBody(req.body)

		const response = await service.authUser(user)
		return res.json(response)
	}

	async listAllUsers(req: Request, res: Response) {
		const service = new UserService()
		const response = await service.listAll()
		return res.json(response)
	}
}

export { UserController }
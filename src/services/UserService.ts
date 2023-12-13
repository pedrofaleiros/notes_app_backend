import { compare, hash } from "bcryptjs";
import { UserRequest } from "../models/user/UserRequest";
import { UserResponse } from "../models/user/UserResponse";
import { UserRepository } from "../repositories/UserRepository";
import { AuthUserResponse } from "../models/user/AuthUserResponse";
import { validateUser } from "../utils/validateUser";
import { getTokenJWT } from "../utils/getTokenJWT";

class UserService {

	private repository: UserRepository;

	constructor() {
		this.repository = new UserRepository();
	}

	async createUser(user: UserRequest): Promise<UserResponse> {
		validateUser(user)

		const hashPassword = await hash(user.password, 8)
		const hashUser = new UserRequest(user.username, hashPassword)

		return await this.repository.createUser(hashUser)
	}

	async authUser(user: UserRequest): Promise<AuthUserResponse> {
		const dbUser = await this.repository.findUserByUsername(user.username)

		if (!await compare(user.password, dbUser.password)) {
			throw new Error('Senha invalida')
		}

		const token = getTokenJWT(dbUser)

		return new AuthUserResponse(dbUser.id, dbUser.username, token)
	}

	async listAll(): Promise<Array<UserResponse> | null> {
		return await this.repository.listAll()
	}
}

export { UserService }
import { hash } from "bcryptjs";
import { UserRequest } from "../models/user/UserRequest";
import prismaClient from "../prisma/PrismaClient";
import { UserResponse } from "../models/user/UserResponse";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "@prisma/client";
import { UserModel } from "../models/user/UserModel";

class UserRepository {

	async createUser(user: UserRequest): Promise<UserResponse> {
		try {
			return await prismaClient.user.create({
				data: {
					username: user.username,
					password: user.password,
				},
				select: {
					id: true,
					username: true,
					created_at: true,
				}
			})
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.message.includes('Unique constraint failed')) {
					throw new Error("Username ja cadastrado")
				}
				throw new Error("Dados invalidos")
			}
			throw new Error("Erro ")
		}
	}

	async findUserByUsername(username: string): Promise<UserModel> {

		const user = await prismaClient.user.findUnique({
			where: {
				username: username
			},
			select: {
				id: true,
				username: true,
				password: true,
				created_at: true
			}
		})

		if (user == null) {
			throw new Error('Nenhum usuario encontrado')
		}

		return new UserModel(user.id, user.username, user.password)
	}

	async listAll(): Promise<Array<UserResponse> | null> {
		const data = await prismaClient.user.findMany({
			select: {
				id: true,
				username: true,
				created_at: true,
			}
		})

		const users: UserResponse[] = []

		for (let i = 0; i < data.length; i++) {
			let aux = new UserResponse(data[i].id, data[i].username, data[i].created_at)
			users.push(aux)
		}

		return users
	}
}

export { UserRepository }
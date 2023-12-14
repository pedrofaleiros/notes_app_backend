import { ActionEntity } from "../models/ActionEntity";
import prismaClient from "../prisma/PrismaClient";
import { normalizeText } from "../utils/normalizeText";

class ActionRepository {
	async createAction(action: ActionEntity) {
		await prismaClient.action.create({
			data: {
				name: action.name
			}
		})
	}

	async deleteAction(action_id: string) {
		await prismaClient.action.delete({
			where: {
				id: action_id
			}
		})
	}

	async getActions() {
		const data = await prismaClient.action.findMany({
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				name: 'asc'
			}
		})
		return data
	}

	async searchActions(name: string) {

		const search = normalizeText(name)

		const data = await prismaClient.action.findMany({
			where: {
				searchName: {
					contains: search
				}
			},
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				name: 'asc'
			}
		})
		return data
	}

	async getActionById(action_id: string) {
		const action = await prismaClient.action.findUnique({
			where: {
				id: action_id
			}
		})
		return action
	}
}

export { ActionRepository }
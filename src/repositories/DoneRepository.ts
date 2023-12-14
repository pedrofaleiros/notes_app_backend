import { DoneModel } from "../models/DoneModel";
import prismaClient from "../prisma/PrismaClient";

class DoneRepository {

	async createDone(done: DoneModel) {
		await prismaClient.done.create({
			data: {
				note_id: done.noteId,
				action_id: done.actionId,
				minutes: done.minutes,
			}
		})
	}

	async updateDone(done: DoneModel) {
		if (done.id == null) throw new Error("Id inválido");

		await prismaClient.done.update({
			data: {
				minutes: done.minutes
			},
			where: {
				id: done.id
			}
		})
	}

	async deleteDone(userId: string, doneId: string) {

		const findNote = await prismaClient.done.findUnique({
			where: {
				id: doneId
			},
		})
		if (!findNote) throw new Error("Nota nao encontrada")

		const verifyUserId = await prismaClient.note.findFirst({
			where: {
				id: findNote.note_id,
				user_id: userId
			}
		})

		if (!verifyUserId) throw new Error("Nao autorizado")

		await prismaClient.done.delete({
			where: {
				id: doneId
			}
		})
	}

	async findNote(userId: string, noteId: string) {
		return await prismaClient.note.findFirst({
			where: {
				id: noteId,
				user_id: userId,
			}
		})
	}

	async findNoteByDone(doneId: string) {
		const done = await prismaClient.done.findUnique({
			where: { id: doneId },
			include: {
				note: {
					select: {
						id: true,
						date: true,
					}
				}
			}
		})

		return done?.note
	}
}

export { DoneRepository }
import { NoteEntity } from "../models/NoteEntity";
import prismaClient from "../prisma/PrismaClient";
import { calculateDifferenceBetweenDate } from "../utils/calculateDifferenceBetweenDate";
import { generateNoteId } from "../utils/generateNoteId";

class NoteRepository {

	async getNoteById(note_id: string) {
		return await prismaClient.note.findUnique({
			where: {
				id: note_id
			}
		})
	}

	async createNote(note: NoteEntity) {
		const note_id = generateNoteId(note)
		await prismaClient.note.create({
			data: {
				id: note_id,
				user_id: note.user_id,
				date: note.date,
				content: note.content,
				body: note.body,
				mind: note.mind,
			}
		})
	}

	async updateNote(note: NoteEntity) {
		await prismaClient.note.update({
			where: {
				id: note.id ?? "",
				user_id: note.user_id
			},
			data: {
				content: note.content,
				body: note.body,
				mind: note.mind,
			},
		})
	}

	async getUserNotes(user_id: string) {
		const notes = await prismaClient.note.findMany({
			where: {
				user_id: user_id
			},
			include: {
				dones: {
					include: {
						action: true
					}
				}
			},
			orderBy: {
				date: "asc"
			}
		})

		return notes
	}

	// async getUserNotesPage(user_id: string, startIndex: number, endIndex: number) {
	// 	const allNotes = await prismaClient.note.findMany({
	// 		where: {
	// 			user_id: user_id
	// 		},
	// 		orderBy: {
	// 			date: "desc"
	// 		}
	// 	})

	// 	if (endIndex >= allNotes.length) throw new Error('Indice inválido')

	// 	const notes = []
	// 	for (let i = startIndex; i < endIndex; i++) {
	// 		notes.push(allNotes[i])
	// 	}
	// 	return notes
	// }

	async getNoteByDate(user_id: string, date: Date) {
		const startDate = new Date(date)
		startDate.setHours(0, 0, 0, 0)

		const endDate = new Date(date)
		endDate.setHours(23, 59, 59, 999)

		const note = await prismaClient.note.findFirst({
			where: {
				user_id: user_id,
				date: {
					gte: startDate,
					lte: endDate,
				}
			},
			include: {
				dones: {
					include: {
						action: true
					}
				}
			}
		})

		return note
	}
}

export { NoteRepository }
import { NoteDTO } from "../dto/NoteDTO"
import { NoteRepository } from "../repositories/NoteRepository"
import { generateNoteId } from "../utils/generateNoteId"
import { validateCreateDate } from "../utils/validateCreateDate"

class NoteService {

	private repository: NoteRepository

	constructor() {
		this.repository = new NoteRepository()
	}

	async createNote(user_id: string, note: NoteDTO) {
		this.validateUserId(user_id)
		validateCreateDate(note.date)

		const noteEntity = note.toEntity(user_id)
		const findNote = await this.repository.getNoteById(generateNoteId(noteEntity));
		if (findNote) throw new Error('Usuario ja possui nota nessa data')

		await this.repository.createNote(noteEntity)
	}

	async updateNote(user_id: string, note: NoteDTO) {
		this.validateUserId(user_id)
		validateCreateDate(note.date)
		if (!note.id || note.id == '') throw new Error('noteId inválido')
		
		const noteEntity = note.toEntity(user_id)
		if(note.id != generateNoteId(noteEntity)) throw new Error("Data inválida");

		const findNote = await this.repository.getNoteById(note.id);
		if (!findNote) throw new Error('Nota nao encontrada')

		await this.repository.updateNote(noteEntity)
	}

	async getUserNotes(user_id: string) {
		this.validateUserId(user_id)
		const notes = await this.repository.getUserNotes(user_id)
		return notes
	}

	async getNoteByDate(user_id: string, date: Date) {
		this.validateUserId(user_id)
		const note = await this.repository.getNoteByDate(user_id, date)

		if(!note) throw new Error('Nota não encontrada')
		return note
	}

	private validateUserId(user_id: string) {
		if (!user_id || user_id == '') throw new Error('userId inválido')
	}
}

export { NoteService }
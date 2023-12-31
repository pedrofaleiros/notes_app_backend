import { DoneModel } from "../models/DoneModel";
import { DoneRepository } from "../repositories/DoneRepository";
import { validateCreateDate } from "../utils/validateCreateDate";

class DoneService {

	private repository: DoneRepository;

	constructor() {
		this.repository = new DoneRepository();
	}

	async createDone(userId: string, done: DoneModel) {
		const note = await this.repository.findNote(userId, done.noteId)
		if (!note) throw new Error("Id inválido");
		validateCreateDate(note.date)

		if (done.minutes < 0 || done.minutes > (60 * 24)) throw new Error("Minutos inválidos");
		if (await this.repository.findNote(userId, done.noteId)) {
			await this.repository.createDone(done)
		} else {
			throw new Error("Nao permitido");
		}
	}

	async updateDone(userId: string, done: DoneModel) {
		const note = await this.repository.findNote(userId, done.noteId)
		if (!note) throw new Error("Id inválido");
		validateCreateDate(note.date)

		if (done.minutes < 0 || done.minutes > (60 * 24)) throw new Error("Minutos inválidos");
		if (await this.repository.findNote(userId, done.noteId)) {
			await this.repository.updateDone(done)
		} else {
			throw new Error("Nao permitido");
		}
	}

	async deleteDone(userId: string, doneId: string | null) {
		if (!doneId) throw new Error("Id inválido");
		const note = await this.repository.findNoteByDone(doneId)
		if (!note) throw new Error("Id inválido");
		validateCreateDate(note.date)

		if (doneId == null) throw new Error("Id inválido");
		await this.repository.deleteDone(userId, doneId)
	}
}

export { DoneService }
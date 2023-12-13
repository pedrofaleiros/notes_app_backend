import { DoneModel } from "../models/DoneModel";
import { DoneRepository } from "../repositories/DoneRepository";

class DoneService {

	private repository: DoneRepository;

	constructor() {
		this.repository = new DoneRepository();
	}

	async createDone(userId: string, done: DoneModel) {
		if (done.minutes < 0 || done.minutes > (60 * 24)) throw new Error("Minutos inválidos");
		if (await this.repository.findNote(userId, done.noteId)) {
			await this.repository.createDone(done)
		} else {
			throw new Error("Nao permitido");
		}
	}

	async updateDone(userId: string, done: DoneModel) {
		if (done.minutes < 0 || done.minutes > (60 * 24)) throw new Error("Minutos inválidos");
		if (await this.repository.findNote(userId, done.noteId)) {
			await this.repository.updateDone(done)
		} else {
			throw new Error("Nao permitido");
		}
	}

	async deleteDone(userId: string, doneId: string | null) {
		if(doneId == null) throw new Error("Id inválido");
		await this.repository.deleteDone(userId, doneId)
	}
}

export { DoneService }
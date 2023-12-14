import { Request, Response } from "express";
import { NoteDTO } from "../dto/NoteDTO";
import { DoneDTO } from "../dto/DoneDTO";
import { NoteService } from "../services/NoteService";
import { formatDate } from "../utils/formatDate";

class NoteController {

	service: NoteService

	constructor(service: NoteService) {
		this.service = service
		this.createNote = this.createNote.bind(this)
		this.updateNote = this.updateNote.bind(this)
		this.getUserNotes = this.getUserNotes.bind(this)
		this.getNoteByDate = this.getNoteByDate.bind(this)
	}

	async createNote(req: Request, res: Response) {
		const user_id = req.user_id as string;
		const note = NoteDTO.fromRequestBody(req.body)

		await this.service.createNote(user_id, note)
		return res.json({ status: 'created' })
	}

	async updateNote(req: Request, res: Response) {
		const user_id = req.user_id as string;
		const note = NoteDTO.fromRequestBody(req.body)

		await this.service.updateNote(user_id, note)
		return res.json({ status: 'updated' })
	}

	async getUserNotes(req: Request, res: Response) {
		const user_id = req.user_id as string;
		const notes = await this.service.getUserNotes(user_id)
		return res.json({
			length: notes.length,
			notes: notes
		})
	}

	async getNoteByDate(req: Request, res: Response) {
		const user_id = req.user_id as string;
		const date = formatDate(req.query.date as string);

		const notes = await this.service.getNoteByDate(user_id, date)
		return res.json(notes)
	}
}

export { NoteController }
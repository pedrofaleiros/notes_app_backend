import { NoteEntity } from "../models/NoteEntity"
import { formatDate } from "../utils/formatDate"

interface Params {
	id: string | null
	date: Date
	content: string
	body: number
	mind: number
}

class NoteDTO {
	id: string | null
	date: Date
	content: string
	body: number
	mind: number

	constructor(params: Params) {
		this.id = params.id
		this.date = params.date
		this.content = params.content
		this.body = params.body
		this.mind = params.mind
	}

	static fromRequestBody(reqBody: any): NoteDTO {
		if (!reqBody.date || !reqBody.content || !reqBody.body || !reqBody.mind) {
			throw new Error('Invalid request')
		}

		return new NoteDTO({
			id: reqBody.id,
			date: formatDate(reqBody.date),
			content: reqBody.content,
			body: reqBody.body,
			mind: reqBody.mind,
		})
	}

	toEntity(user_id: string | null): NoteEntity {
		return new NoteEntity({
			id: this.id,
			date: this.date,
			content: this.content,
			body: this.body,
			mind: this.mind,
			user_id: user_id ?? ""
		})
	}
}

export { NoteDTO }
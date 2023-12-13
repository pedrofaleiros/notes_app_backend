import { NoteDTO } from "../dto/NoteDTO"

interface Params {
	id: string | null
	date: Date
	content: string
	body: number
	mind: number
	user_id: string
}

class NoteEntity {
	id: string | null
	date: Date
	content: string
	body: number
	mind: number
	user_id: string

	constructor(params: Params) {
		this.id = params.id
		this.date = params.date
		this.content = params.content
		this.body = params.body
		this.mind = params.mind
		this.user_id = params.user_id
	}

	toDTO(): NoteDTO {
		return new NoteDTO({
			id: this.id,
			date: this.date,
			content: this.content,
			body: this.body,
			mind: this.mind,
		})
	}
}

export { NoteEntity }

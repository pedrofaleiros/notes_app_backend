import { NoteDTO } from "../dto/NoteDTO"
import { ActionEntity } from "./ActionEntity"
import { DoneEntity } from "./DoneEntity"

interface Params {
	id: string | null
	date: Date
	content: string
	body: number
	mind: number
}

class NotesResponse {
	id: string | null
	date: Date
	content: string
	body: number
	mind: number
	// dones: DoneEntity[]

	constructor(params: Params) {
		this.id = params.id
		this.date = params.date
		this.content = params.content
		this.body = params.body
		this.mind = params.mind
		// this.dones = params.dones
	}
}

export { NotesResponse }

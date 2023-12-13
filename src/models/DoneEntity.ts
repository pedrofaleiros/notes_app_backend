import { DoneDTO } from "../dto/DoneDTO"

class DoneEntity {
	id: string | null
	noteId: string
	actionId: string
	minutes: number

	constructor(id: string | null, noteId: string, actionId: string, minutes: number) {
		this.id = id
		this.noteId = noteId
		this.actionId = actionId
		this.minutes = minutes
	}

	toDTO(): DoneDTO {
		return new DoneDTO(this.id, this.noteId, this.actionId, this.minutes)
	}
}

export { DoneEntity }
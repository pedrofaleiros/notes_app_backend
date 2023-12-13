import { DoneEntity } from "../models/DoneEntity";
import { DTOInterface } from "./DTOInterface";

class DoneDTO implements DTOInterface<DoneDTO, DoneEntity> {
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

	static fromRequestBody(reqBody: any): DoneDTO {

		if (!reqBody.note_id || !reqBody.action_id || !reqBody.minutes) {
			throw new Error('Invalid request');
		}
		return new DoneDTO(reqBody.id, reqBody.note_id, reqBody.action_id, reqBody.minutes)
	}

	toEntity(): DoneEntity {
		return new DoneEntity(this.id, this.noteId, this.actionId, this.minutes)
	}
}

export { DoneDTO }

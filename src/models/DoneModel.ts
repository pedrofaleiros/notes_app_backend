interface Params {
	id: string | null
	noteId: string
	actionId: string
	minutes: number
}

class DoneModel {
	id: string | null
	noteId: string
	actionId: string
	minutes: number

	constructor(params: Params) {
		this.id = params.id
		this.noteId = params.noteId
		this.actionId = params.actionId
		this.minutes = params.minutes
	}

	static fromRequestBody(reqBody: any): DoneModel {
		if (!reqBody.note_id || !reqBody.action_id || !reqBody.minutes) {
			throw new Error('Invalid request')
		}

		return new DoneModel({
			id: reqBody.id,
			noteId: reqBody.note_id,
			actionId: reqBody.action_id,
			minutes: reqBody.minutes
		})
	}
}

export { DoneModel }
import { ActionDTO } from "../dto/ActionDTO"

class ActionEntity {
	id: string | null
	name: string

	constructor(id: string | null, name: string) {
		this.name = name
		this.id = id
	}

	toDTO(): ActionDTO {
		return new ActionDTO(this.id, this.name)
	}
}

export { ActionEntity }
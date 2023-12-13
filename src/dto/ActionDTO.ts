import { DTOInterface } from "./DTOInterface";
import { ActionEntity } from "../models/ActionEntity";

class ActionDTO implements DTOInterface<ActionDTO, ActionEntity> {
    id: string | null
    name: string

    constructor(id: string | null, name: string) {
        this.name = name
        this.id = id
    }

    static fromRequestBody(reqBody: any): ActionDTO {
        if (!reqBody.name) {
            throw new Error('Invalid request');
        }
        return new ActionDTO(reqBody.id, reqBody.name)
    }

    toEntity(): ActionEntity {
        return new ActionEntity(this.id, this.name)
    }
}

export { ActionDTO }

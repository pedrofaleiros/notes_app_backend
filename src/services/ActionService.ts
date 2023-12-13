import { ActionDTO } from "../dto/ActionDTO";
import { ActionRepository } from "../repositories/ActionRepository";

class ActionService {

	private repository: ActionRepository;

	constructor() {
		this.repository = new ActionRepository();
	}

	async createAction(action: ActionDTO) {
		if (action.name.length <= 1 || action.name.length > 50) {
			throw new Error('Nome da atividade inválido')
		}
		await this.repository.createAction(action.toEntity())
	}

	async deleteAction(action_id: string) {
		if (!action_id || action_id == '') throw new Error('Id inválido')

		if (await this.repository.getActionById(action_id)) {
			await this.repository.deleteAction(action_id)
		} else {
			throw new Error('Atividade não encontrada')
		}
	}

	async getActions() {
		return await this.repository.getActions()
	}
}

export { ActionService }
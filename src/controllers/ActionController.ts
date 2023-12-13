import { Request, Response } from "express";
import { ActionDTO } from "../dto/ActionDTO";
import { ActionService } from "../services/ActionService";

class ActionController {

	private service: ActionService

	constructor(service: ActionService) {
		this.service = service
		this.createAction = this.createAction.bind(this)
		this.deleteAction = this.deleteAction.bind(this)
		this.getActions = this.getActions.bind(this)
	}

	async createAction(req: Request, res: Response) {
		const action = ActionDTO.fromRequestBody(req.body)
		await this.service.createAction(action)
		return res.json({ status: 'created' })
	}

	async deleteAction(req: Request, res: Response) {
		const actionId = req.query.action_id as string
		await this.service.deleteAction(actionId)
		return res.json({ status: 'deleted' })
	}

	async getActions(req: Request, res: Response) {
		const response = await this.service.getActions()
		return res.json({ 
			length: response.length,
			actions: response 
		})
	}

}

export { ActionController }
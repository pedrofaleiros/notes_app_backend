import { Request, Response } from "express";
import { ActionDTO } from "../dto/ActionDTO";
import { DoneService } from "../services/DoneService";
import { DoneModel } from "../models/DoneModel";

class DoneController {

	private service: DoneService

	constructor(service: DoneService) {
		this.service = service
		this.createDone = this.createDone.bind(this)
		this.deleteDone = this.deleteDone.bind(this)
		this.updateDone = this.updateDone.bind(this)
	}

	async createDone(req: Request, res: Response) {
		const done = DoneModel.fromRequestBody(req.body)
		const userId = req.user_id as string;

		await this.service.createDone(userId, done)
		return res.json({ status: 'created' })
	}

	async deleteDone(req: Request, res: Response) {
		const userId = req.user_id as string;
		const doneId = req.query.done_id as string | null;

		await this.service.deleteDone(userId, doneId)
		return res.json({ status: 'deleted' })
	}

	async updateDone(req: Request, res: Response) {
		const done = DoneModel.fromRequestBody(req.body)
		const userId = req.user_id as string;

		await this.service.updateDone(userId, done)
		return res.json({ status: 'updated' })
	}

}

export { DoneController }
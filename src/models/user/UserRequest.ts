class UserRequest {
	username: string
	password: string

	constructor(username: string, password: string) {
		this.username = username
		this.password = password
	}

	static fromRequestBody(reqBody: any): UserRequest {
		if (!reqBody.username || !reqBody.password) {
			throw new Error('Invalid request');
		}

		return new UserRequest(reqBody.username, reqBody.password)
	}
}

export { UserRequest }

class UserModel {
	id: string
	username: string
	password: string

	constructor(id: string, username: string, password: string) {
		this.id = id
		this.username = username
		this.password = password
	}

}

export { UserModel }

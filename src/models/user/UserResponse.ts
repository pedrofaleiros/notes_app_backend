class UserResponse {
	id: string
	username: string
	created_at: Date | null

	constructor(id: string, username: string, created_at: Date | null) {
		this.id = id
		this.username = username
		this.created_at = created_at
	}

}

export { UserResponse }

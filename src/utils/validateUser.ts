import { UserRequest } from "../models/user/UserRequest";

export function validateUser(user: UserRequest) {
	if (!validateUsername(user.username)) {
		throw new Error('Username invalido');
	}

	if (!validatePassword(user.password)) {
		throw new Error('Senha invalida');
	}
}

function validateUsername(name: string): boolean {
	if (name.length > 30 || name.length < 3) {
		return false;
	}
	if (!/^[a-zA-Z0-9]+$/.test(name)) {
		return false;
	}
	return true;
}

function validatePassword(password: string): boolean {
	if (password.length < 8) {
		return false;
	}
	if (!/\d/.test(password)) {
		return false;
	}
	if (!/[a-zA-Z]/.test(password)) {
		return false;
	}
	const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	if (!specialCharacters.test(password)) {
		return false;
	}
	if (/\s/.test(password)) {
		return false;
	}
	return true;
}


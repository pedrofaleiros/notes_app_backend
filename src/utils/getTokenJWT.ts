import { sign } from "jsonwebtoken";
import { UserModel } from "../models/user/UserModel";

export function getTokenJWT(user: UserModel): string {
	const jwtSecret = process.env.JWT_SECRET

	if (jwtSecret == undefined) {
		throw new Error('Erro no servidor')
	}

	return sign(
		{
			name: user.username,
		},
		jwtSecret,
		{
			subject: user.id,
			expiresIn: '30d'
		}
	);
}
import { calculateDifferenceBetweenDate } from "./calculateDifferenceBetweenDate";

export function validateCreateDate(noteDate: Date) {
	const today = new Date()
	const difDays = calculateDifferenceBetweenDate(today, noteDate);

	if (noteDate.getFullYear() > today.getFullYear()) throw new Error('Não é possível editar / criar notas para o futuro')
	if (noteDate.getMonth() > today.getMonth()) throw new Error('Não é possível editar / criar notas para o futuro')
	if (noteDate.getDate() > today.getDate()) throw new Error('Não é possível editar / criar notas para o futuro')
	if (difDays > 8) throw new Error('Não é possível editar / criar notas após mais de 7 dias')
}
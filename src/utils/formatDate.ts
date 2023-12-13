export function formatDate(dateString: string | null): Date {
	if(!dateString) throw new Error("Data invalida")
	
	const arr = dateString.split('/')

	if (arr.length < 3) throw new Error("Data invalida")

	const day = parseInt(arr[0])
	const month = parseInt(arr[1])
	const year = parseInt(arr[2])

	if (day < 1 || day > 31) throw new Error("Dia invalido")
	if (month < 1 || month > 12) throw new Error("Mes invalido")
	if (year < 1900 || year > 2030) throw new Error("Ano invalido")

	return new Date(year, month-1, day)
}
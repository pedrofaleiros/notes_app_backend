export function calculateDifferenceBetweenDate(data1: Date, data2: Date): number {
	let time1 = data1.getTime()
	let time2 = data2.getTime()

	let difMilliseconds = Math.abs(time1 - time2)
	let difDays = difMilliseconds / (24 * 60 * 60 * 1000)
	difDays = Math.round(difDays)

	return Math.round(difDays);
}

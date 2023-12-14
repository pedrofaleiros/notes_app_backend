export function normalizeText(input: string): string {
	let textoSemAcentos = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	return textoSemAcentos.toLowerCase().replace(/[^a-z]/g, "");
}
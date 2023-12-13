import { describe, expect, test } from '@jest/globals';
import { formatDate } from '../utils/formatDate';
import { validateCreateDate } from '../utils/validateCreateDate';

describe('calculateDifferenceBetweenDate', () => {
	test('deve retornar a diferença em dias entre duas datas', () => {

		let date = formatDate("10/12/2023")
		let hasErro = false
		try {
			validateCreateDate(date)
		} catch (e) {
			hasErro = true
		}
		expect(hasErro).toBe(false)
		
		date = formatDate("4/12/2023")
		hasErro = false
		try {
			validateCreateDate(date)
		} catch (e) {
			hasErro = true
		}
		expect(hasErro).toBe(true)
		
		date = formatDate("12/12/2024")
		hasErro = false
		try {
			validateCreateDate(date)
		} catch (e) {
			hasErro = true
		}
		expect(hasErro).toBe(true)
	});
});

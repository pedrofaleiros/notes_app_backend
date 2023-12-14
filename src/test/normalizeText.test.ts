import { describe, expect, test } from '@jest/globals';
import { normalizeText } from '../utils/normalizeText';

describe('normalizeText', () => {
    test('deve retornar o nome sem caracteres especiais e com letras minusculas', () => {

		expect(normalizeText("Jõao da Silva")).toBe("joaodasilva")
		expect(normalizeText("Pedro costa reSENDE FALEIRos")).toBe("pedrocostaresendefaleiros")
		expect(normalizeText("name@123")).toBe("name")
    });
});

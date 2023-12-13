import { calculateDifferenceBetweenDate } from "../utils/calculateDifferenceBetweenDate";
import { describe, expect, test } from '@jest/globals';

describe('calculateDifferenceBetweenDate', () => {
    test('deve retornar a diferença em dias entre duas datas', () => {
        let data1 = new Date('2023-12-8');
        let data2 = new Date('2023-12-11');
        let esperado = 3;

        let resultado = calculateDifferenceBetweenDate(data1, data2);

        expect(resultado).toBe(esperado);

        data1 = new Date('2023-12-11');
        data2 = new Date('2023-12-8');
        esperado = 3;

        resultado = calculateDifferenceBetweenDate(data1, data2);

        expect(resultado).toBe(esperado);
    });
});
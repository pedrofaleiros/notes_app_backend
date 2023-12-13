import { describe, expect, test } from '@jest/globals';
import { formatDate } from '../utils/formatDate';

describe('calculateDifferenceBetweenDate', () => {
    test('deve retornar a diferença em dias entre duas datas', () => {

        let dateString: string = "25/12/2023"
        let date: Date = formatDate(dateString)
        expect(date.getMonth()).toBe(11)
        expect(date.getDate()).toBe(25)
        
        let day = 30
        let month = 7
        let year = 2001
        dateString = `${day}/${month}/${year}`
        date = formatDate(dateString)
        expect(date.getMonth()).toBe(month-1)
        expect(date.getDate()).toBe(day)
    });
});

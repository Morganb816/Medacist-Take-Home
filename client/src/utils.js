
/**
 * @name intToRomanNumeral
 * @description Accepts a positive integer and returns the roman numeral equivalent.
 * @param {number} int Integer to convert into a roman numeral.
 * @returns {string} Roman Numeral equivalent.
 */
export const intToRomanNumeral = (int) => {
    const numerals = [
        ['C', 100],
        ['L', 50],
        ['X', 10],
        ['V', 5],        
        ['I', 1],
    ];

    let output = '';
    
    numerals.forEach(numeral => {
        while (int  >= numeral[1]) {
            output += numeral[0];
            int -= numeral[1];
        }
    });

    return output;
}
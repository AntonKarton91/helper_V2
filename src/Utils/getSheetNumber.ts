export const getSheetNumber = (str: string): Number => {
    const numberPattern = /\d+/g;
    const numbersFound = str.match(numberPattern);
    return numbersFound ? Number(numbersFound) + 1  : 999
}
import getClipboardText from "./getClipboardText";

export const excelBufferParsing = async (): Promise<string[][]> => {
    const inputData = await getClipboardText()
    if (!inputData) return []
    const re = /[\r"']/gi;
    const re2 = /\n"/gi;
    const pp = inputData.replace(re2, "")
    const arr = pp.replace(re, "").split("\n")
    arr.pop()
    let arr1 = []
    for (const a of arr) {
        arr1.push(a.split("\t"))
    }
    return arr1
}


export const gradientShelfParsing = async (): Promise<{shelfNumber: number, displays: string[]}[]> => {
    let inputArr = await  excelBufferParsing()
    inputArr = inputArr.filter(e=>e[0].includes("полк"))
    return inputArr.map(e => {
        const numb = Number(e[0].match(/\d+/g))
        return  {shelfNumber: numb, displays: e.slice(1)}
    })
}


export interface IInputSetArray {
    index: number,
    displayArticul: string,
    displayCount: any
}

export const getSetArray = async (inputData: string[][]): Promise<IInputSetArray[]> => {
        const array: [] = []

            inputData.forEach((disp: string[]) => {
            if (disp[0]) {
                const lastElem = disp.length - 1
                const count = disp[lastElem].replace(",", ".")
                // @ts-ignore

                array.push({
                    index: Math.random(),
                    displayArticul: disp[0],
                    displayCount: isNaN(Number(count)) ? 0 : Number(count)
                })
            }

        })

    return array
}
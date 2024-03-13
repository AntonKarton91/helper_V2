export interface IInputSetArray {
    displayArticul: string,
    displayCount: any
}

export const getSetArray = async (inputData: string[][]): Promise<IInputSetArray[]> => {
        const array = []

            inputData.forEach((disp: string[]) => {
            if (disp[0]) {
                const lastElem = disp.length - 1
                const count = disp[lastElem].replace(",", ".")
                array.push({
                    displayArticul: disp[0],
                    displayCount: Number(count)
                })
            }

        })

    return array
}
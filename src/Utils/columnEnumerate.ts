export const columnEnumerate = (count: number): String[] => {
    let one = 1
    let n = 1
    let o = 0
    const outArr = []

    for (let i=1; i<=count; i++) {
        if (o>=100) break
        if (i<=26) {
            outArr.push(String.fromCharCode(64 + one))
            one++
            ++o
            continue
        }
        if (i>26) {
            for (let u=1; u<=26; u++) {
                if (o>=100) break
                outArr.push(`${String.fromCharCode(64 + n)}${String.fromCharCode(64 + u)}`)
                ++o
            }
        }
        ++n
    }
    return outArr
}
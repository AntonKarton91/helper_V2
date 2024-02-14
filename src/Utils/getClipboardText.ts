const getClipboardText = async (): Promise<string> => {
    try {
        return  await navigator.clipboard.readText()

    } catch (e) {return ""}

}

export default getClipboardText
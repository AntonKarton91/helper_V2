const fs = window.require('fs')


export const createFolder = async (folderPath: string): Promise<{status: boolean, message: string}> => {
    try {
        if (!fs.existsSync(folderPath)) {
            await fs.mkdir(folderPath, ()=>{});
            console.log("Директория успешно создана")
            return {status: true, message: "Директория успешно создана"}
        }
        else {
            console.log("Такая папка уже есть")

            return {status: false, message: "Такая папка уже есть"}
        }
    } catch (err) {
        console.log("Ошибка создания директории")
        return {status: false, message: "Ошибка создания директории"}
    }
}
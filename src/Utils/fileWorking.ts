const fs = window.require('fs')
const path = window.require('path');

export const fileWorker = {
    createFolder: async (folderPath: string): Promise<{status: boolean, message: string}> => {
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
    },
    getExcelFile: (fileArray: DataTransfer) => {
        const files: File[] = Array.from(fileArray.files);
        // @ts-ignore
        const filePaths = files.map(file => file.path);
        if (typeof filePaths[0] === "string" && (path.extname(filePaths[0]) === "xlsx" || "xlx")) {
            return filePaths[0]
        }
        else return ""
    },
    getClientName: (filePaths: string) => {
        const splittedPath = filePaths.split("\\")
        return splittedPath[splittedPath.length-3]
},
    getExcelFileName: (filePaths: string): string => {
        return path.basename(filePaths)

    }


}

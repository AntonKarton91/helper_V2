import {columnEnumerate} from "../Utils/columnEnumerate";
const electron = window.require('electron');
const { spawn } = window.require('child_process');
const robot = window.require("@jitsi/robotjs");
const Excel = window.require('exceljs')
const ps = window.require('ps-node')

export class ExcelClass {
    private filePath: string;
    private book: any;
    private sheet: any;

    constructor() {
        this.filePath=""

        this.book = new Excel.Workbook();

    }

    async sheetInit(filePath: string) {
        this.filePath = filePath
        await this.book.xlsx.readFile(filePath)
        this.sheet = this.book.getWorksheet(1);
    }
    recalcForulas() {
        this.sheet.eachRow((row: any) => {
            row.eachCell((cell: any) => {
                if (cell.formula) {
                    cell.value = { formula: cell.formula };
                }
            });
        });
    }

    async resetExcelFile (filePath: string){
        for (let col = 1; col <= 300; col++) {
            const cell = this.sheet.getCell(2, col);

            cell.value = 0;
        }
        this.sheet.eachRow((row: any) => {
            row.eachCell((cell: any) => {
                if (cell.formula) {
                    cell.value = { formula: cell.formula };
                }
            });
        });
        this.recalcForulas()

    }

    async rebuildExcelFile(filePath: string) {
        const child = await spawn(process.env.REACT_APP_EXCEL_PATH, [filePath])
        const interval = setInterval(()=> {
            ps.lookup({}, function (err: any, resultList: any) {
                let isExist = false
                for (let process of resultList) {
                    if (!!process.arguments[0] &&
                        (process.arguments[0].includes("MatCalc")
                            || process.arguments[0].includes("ShelfCalc"))) {
                        isExist = true
                        break
                    }}
                if (isExist) {
                    clearInterval(interval)
                    clearTimeout(timeout)
                    robot.keyTap('s', ['control']);
                    setTimeout(() => {
                        child.kill()
                    }, 50)
                }})
            console.log(321321)
        }, 300)
        const timeout = setTimeout(() => {
            clearInterval(interval)
        }, 10000)
    }



    async excelSave(filePath: string) {
        await this.book.clearThemes();
        await this.book.xlsx.writeFile(filePath)
        await this.rebuildExcelFile(filePath)
    }

    async aa() {
        console.log(this.sheet.getCell("C3").result)
    }






}
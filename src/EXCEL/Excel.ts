import {columnEnumerate} from "../Utils/columnEnumerate";
const electron = window.require('electron');
const { spawn } = window.require('child_process');
const robot = window.require("@jitsi/robotjs");
const Excel = window.require('exceljs')


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

    async resetExcelFile (filePath: string){
        const columnArr = columnEnumerate(150)
        const cell = this.sheet.getCell("D2");
        const cell1 = this.sheet.getCell("F2");
        cell.value = 10
        cell1.value = 10
        this.sheet.eachRow((row: any) => {
            row.eachCell((cell: any) => {
                if (cell.formula) {
                    cell.value = { formula: cell.formula };
                }
            });
        });
    }

    async rebuildExcelFile(filePath: string) {
        const child = await spawn("process.env.REACT_APP_EXCEL_START_DELAY", [filePath])
        setTimeout(async ()=> {
            robot.keyTap('s', ['control']);
        }, 200)
        setTimeout(async ()=> {
            child.kill()
    })}


    async excelSave(filePath: string) {
        await this.book.xlsx.writeFile(filePath)
        await this.rebuildExcelFile(filePath)
    }

    async aa() {
        console.log(this.sheet.getCell("C3").result)
    }






}
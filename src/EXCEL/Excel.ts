import {columnEnumerate} from "../Utils/columnEnumerate";

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

    async resetExcelFile (){
        const columnArr = columnEnumerate(150)
        const cell = this.sheet.getCell("D2");
        cell.value = 420
        // for (let column of columnArr) {
        //     const cell = this.sheet.getCell(column + "2");
        //     console.log(cell.fill);
        //     cell.value = 0
        //     if (cell.hasOwnProperty("fgColor")) {
        //         if (cell.fill.fgColor.rgb === "FFFF00" && cell.value && typeof cell.value == "number") {
        //             cell.value = 0
        //         }
        //     }
        //
        // }


    }


    async excelSave(filePath: string) {
        this.book.xlsx.writeFile(filePath)
    }




}
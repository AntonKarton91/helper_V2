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

    async sheetInit(filePath: string) {
        this.filePath = filePath
        await this.book.xlsx.readFile(filePath)
        this.sheet = this.book.getWorksheet(1);
    }


}
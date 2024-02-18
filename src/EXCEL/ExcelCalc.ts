
const xl = window.require('excel4node');



export class ExcelCalc {
    private filePath: string;
    private workbook: any;
    private worksheet: any;

    constructor() {
        this.filePath= ""

    }

    async sheetInit(filePath: string) {
        this.filePath = filePath
        this.workbook = new xl.Workbook();
        this.worksheet = this.workbook.addWorksheet('Лист3');
    }

    async resetExcelFile (){
        // for (let i=0; i>=150; i++) {
        //     const cell = this.worksheet.getCellAt(i, 2);
        //     cell.v = 0
        //
        // }
        this.workbook.Sheets['Лист3'].D2.v = 42;


    }


    async excelSave(filePath: string) {
        // XLSX_CALC(this.workbook)
        // const buffer = write(this.workbook, { type: 'buffer' });
        // XLSX.writeFile(this.workbook, filePath);
    }


}

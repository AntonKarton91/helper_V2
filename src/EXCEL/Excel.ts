import {columnEnumerate} from "../Utils/columnEnumerate";
import {IInputSetArray} from "../Utils/setWorkers";
const electron = window.require('electron');
const { spawn } = window.require('child_process');
const robot = window.require("@jitsi/robotjs");
const Excel = window.require('exceljs')
const ps = window.require('ps-node')
const kill1  = window.require('tree-kill');
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
            const cellName = this.sheet.getCell(1, col);
            const cellVal = this.sheet.getCell(2, col);
            if (!!cellName.value) {
                cellVal.value = 0;
            }

        }
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
                       // kill1(child.pid)
                    }, 50)
                }})
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

    async excelSaveWithoutRebuild(filePath: string) {
        await this.book.clearThemes();
        await this.book.xlsx.writeFile(filePath)
    }

    async aa() {
        console.log(this.sheet.getCell("D2"))
    }


    async changeExcelWithSet (filePath: string, inputArray: IInputSetArray[]){
        const articulArray = inputArray.map(d=>(d.displayArticul).replace(/[^\d]/g, ''))
         for (let col = 1; col <= 300; col++) {
            const cell = this.sheet.getCell(1, col);
            for (let i of articulArray) {
                if (!!cell.value) {
                    let cellVal
                    if (typeof cell.value === "string") {
                        cellVal = cell.value
                    }
                    else if (typeof cell.value === "object") {
                        cellVal = cell.value.text
                    }
                    else break

                    if (cellVal?.includes(i)) {
                        const disp = inputArray.find(d=>d.displayArticul.includes(i))
                        const countCell = this.sheet.getCell(2, col);
                        if (disp) {
                            countCell.value = countCell.value + disp.displayCount
                            this.boxesCount(col)
                        }
                    }
                    }
                }

        }
        this.recalcForulas()

    }

    boxesCount(displayCellCol: number, displayName: string) {
        let boxes: {cellRow: number, boxData: string}[] = []
        for (let row = 1; row <= 300; row++) {
            const boxCell = this.sheet.getCell(row, 1)
            const valCell = this.sheet.getCell(row, displayCellCol);
            if (boxCell.value) {
                if ((boxCell.value.includes("Короб") || boxCell.value.includes("короб")) && valCell.value) {
                    const item = boxes.find(i=>i.cellRow === row)

                    if (item) {
                        boxes = [...boxes].map(b=>{
                            if (b.cellRow === row) {
                                return {...b, boxData: b.boxData + 1}
                            }
                            else return b
                        })
                    }
                    else {
                        boxes.push({
                            cellRow: row,
                            boxData: boxCell.value + " " +
                        })
                    }
                }

            }
        }
        console.log(boxes)
    }





}
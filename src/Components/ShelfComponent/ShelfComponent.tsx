import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
// @ts-ignore
import styles from "./style.module.css"

export interface shelfProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    // onChange: ()=>void
    shelfNumber: number
    displayList: {id: number, name: string, width: number, height: number}[]
    pallet?: {name: string, width: number, depth: number}
}

const ShelfComponent= ({shelfNumber, displayList, pallet}:shelfProps): React.ReactElement => {

    const template = () => {
        let temp = ""
        displayList.forEach(d=> {
            temp = temp + " " + (d.name.length>0 ? d.width + "px" : "1fr")
        })
        return temp
    }
    template()

    const widthSum = (): number => {
        return displayList.reduce((d, i)=>d+i.width, 0)
    }

    const containerWidth = () => {
        return pallet
            ? pallet.width
            : widthSum()
    }
    const isFit = () => {
        if (!pallet) return true
        return (pallet.width - 4 - widthSum()) >= 0
    }


    return (
        <div className={styles.container} style={{width: containerWidth(), gridTemplateAreas: template()}}>
            <div className={styles.dispContainer} style={{gridTemplateColumns: template()}}>
                {
                    displayList.map(d=> {
                        return <div className={styles.disp} style={{backgroundColor: isFit() ? "" : "red"}}>{d.name}</div>
                    })
                }
            </div>

            {
                pallet ? <div className={styles.pallet}>Поддон {pallet.width} мм</div> : <div className={styles.pallet}>Без поддона</div>
            }
        </div>
    )
};

export default ShelfComponent;
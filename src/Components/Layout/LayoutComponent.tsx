import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./layout.module.scss"
import {calculationType} from "../../Pages/OrderCalculationPage";
import {Box, Tab, Tabs} from "@mui/material";


export interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export interface ISheet {
    name: string,
    type: calculationType
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div>
            aaa
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}






const LayoutComponent = ({children}: LayoutProps): React.ReactElement => {
    const [sheetList, setSheetList] = useState<ISheet[]>([])


    const addSheet = () => {
        setSheetList(prevState => [...prevState, {name: "Лист1", type: calculationType.OneByOne}])
    }
    //
    // return (
    //     <div
    //         className={styles.container}
    //         style={{backgroundImage: "url('https://kartinki.pics/pics/uploads/posts/2022-08/1660018624_19-kartinkin-net-p-fon-dlya-programmi-krasivo-19.jpg')"}}
    //     >
    //         <div className={styles.header}>
    //             {/*<HeaderComponent/>*/}
    //         </div>
    //         <div className={styles.content} >
    //             {children}
    //         </div>
    //         <div className={styles.sheetPrevContainer}>
    //             {
    //                 sheetList.map(sheet => {
    //                     return <div className={styles.sheetPrev}>{sheet.name}</div>
    //                 })
    //             }
    //             <div className={styles.sheetPrev} onClick={addSheet}>+</div>
    //         </div>
    //
    //     </div>
    // );

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        sheetList.map((sheet, i) => {
                            return <Tab label="List 1" {...a11yProps(i)} />
                        })
                    }
                    <Tab label="+" {...a11yProps(sheetList.length+1)} onClick={addSheet}/>
                </Tabs>
            </Box>
            {
                sheetList.map((sheet, i) => {
                    return <CustomTabPanel value={value} index={i}/>
                })
            }

        </Box>
            {children}
        </div>
    );
};

export default LayoutComponent;
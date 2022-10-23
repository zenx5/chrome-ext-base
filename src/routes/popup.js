import { useEffect, useState } from 'react'
import { 
    Box, 
    Button, 
    Card, 
    CardContent, 
    CardActions, 
    TableContainer, 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
    Typography } from "@mui/material";
import { createPort, send } from "../utils/Message";
import { get } from "../utils/Storage";

export default function Popup(){
    const [words, setWords] = useState(null);
    const [total, setTotal] = useState(0);

    const port = createPort('Popup', (a,b,c) => {
        console.log(a, b, c)
    })


    useEffect(() => {
        (total===0 && (async ()=>{await getData()})())
    }, []);

    const getData = async () => {
        const tabs = await chrome.tabs.query({active:true, status:"complete"})
        console.log( 'tabs', tabs )
        const currentTab = tabs.filter( tab => /https:\/\/www\.biblegateway\.com/.exec(tab.url)!==null)[0]
        const search = currentTab.url.match(/search=[a-zA-Z0-9+]{1,}/)[0].split('=')[1].toLowerCase()
        const version = currentTab.url.match(/version=[a-zA-Z0-9]{1,}/)[0].split('=')[1].toLowerCase()
        console.log( search, version)
        chrome.storage.local.get('library', ({library}) => {
            console.log(library)
            console.log( library[`${version}`][`${search}`] )
            setWords(library[`${version}`][`${search}`])
        })
    }

    
    const totalWords = ()=>{
        let total = 0
        words.forEach( word => (total += word.quantity) )
        words.push({ word: '', quantity: total })
        return total
    }

    



    const percent = (quantity) => {
        const per = String( 100*quantity/total )
        return /[0-9]{1,3}(\.[0-9]{0,2})?/.exec( per )[0]
    }

    return(
        <Box style={{backgroundColor:'#a0a0a0'}}>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant='h5'>Passage Details</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Word</TableCell>
                                    <TableCell>Percent</TableCell>
                                    <TableCell>Quantity</TableCell>                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { 
                                    words && Object.keys(words).map( word => (
                                        // word.match(/[a-zA-Z0-9]{1,}/)!==null && 
                                        <TableRow>
                                            <TableCell align="left">{word}</TableCell>
                                            <TableCell align="center"></TableCell>
                                            {/* <TableCell align="center">{ word===''? '-' : percent(words[word])}%</TableCell> */}
                                            <TableCell align="right"><Button >{words[word]}</Button></TableCell>
                                        </TableRow>
                                    ) )
                                }
                                {/* {words && words.map( item => (
                                    
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Box>
    )
}
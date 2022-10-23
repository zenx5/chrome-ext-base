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
    const [words, setWords] = useState({});
    const [total, setTotal] = useState(0);

    const port = createPort('Popup', (a,b,c) => {
        console.log(a, b, c)
    })


    useEffect(() => {
        (total===0 && getData())
    }, []);

    const getData = async () => {
        const library = await get('library')
        console.log(library)
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
                                {words.map( item => (
                                    <TableRow>
                                        <TableCell align="left">{item.word}</TableCell>
                                        <TableCell align="center">{ item.word===''? '-' : percent(item.quantity)}%</TableCell>
                                        <TableCell align="right"><Button onClick={()=>send(port, {quantity:item.quantity})}>{item.quantity}</Button></TableCell>
                                    </TableRow>
                                ))}
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
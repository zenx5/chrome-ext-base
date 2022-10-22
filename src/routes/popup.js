import { Box, Card, CardContent, CardActions, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";

export default function Popup(){

    const itemClick = () => {

    }

    let words = [
        { word:'casa', quantity: 2, },
        { word:'hola', quantity: 2, },
        { word:'vida', quantity: 1, },
    ]
    
    const totalWords = ()=>{
        let total = 0
        words.forEach( word => (total += word.quantity) )
        words.push({ word: '', quantity: total })
        return total
    }

    const total = totalWords()



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
                                        <TableCell align="right">{item.quantity}</TableCell>
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
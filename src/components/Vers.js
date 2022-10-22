import { Typography } from '@mui/material'
import ItemWord from './ItemWord'

export default function Vers(props){

    const { content } = props
    const words = content.split(' ')

    return(<Typography style={{ display:'flex', flexWrap:'wrap' }}>
        { words.map( word => <ItemWord>{word}</ItemWord> )}
    </Typography>)
}
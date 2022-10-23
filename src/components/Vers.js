import { Typography } from '@mui/material'

export default function Vers( props ){

    

    return(<Typography style={{ display:'flex', flexWrap:'wrap' }}>
        { props.content }
    </Typography>)
}
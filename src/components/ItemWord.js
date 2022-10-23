import { useState } from 'react'

export default function ItemWord(props){
    const [hover, setHover] = useState(false);
    const { children, style, onClick } = props

    const styleDefault = {
        cursor: 'pointer',
        padding: '2px 5px'
    }

    

    const handlerHover = (enter) => () => {
        setHover(enter)
    }

    return(<span 
            style={{...styleDefault, ...style, fontWeight: hover ? '900' : '400' }}
            onMouseLeave={handlerHover(false)}
            onMouseEnter={handlerHover(true)}
            onClick={ () => onClick(children) }
        >{children}</span>)
}
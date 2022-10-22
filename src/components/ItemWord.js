import { useState } from 'react'

export default function ItemWord(props){
    const [hover, setHover] = useState(false);
    const { children, style } = props

    const styleDefault = {
        cursor: 'pointer',
        padding: '2px 5px'
    }

    const handlerClick = () => {
        console.log(children.replace('\xA0',' ').replaceAll(/[\.,0-9;:!?¿¡ ]/ig, ''))
    }

    const handlerHover = (enter) => () => {
        setHover(enter)
    }

    return(<span 
            style={{...styleDefault, ...style, fontWeight: hover ? '900' : '400' }}
            onMouseLeave={handlerHover(false)}
            onMouseEnter={handlerHover(true)}
            onClick={handlerClick}
        >{children}</span>)
}
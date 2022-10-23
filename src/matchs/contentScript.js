import ReactDOM from 'react-dom'
import { Vers, ItemWord } from '../components'
import { createPort, send } from '../utils/Message'

export default function contentScript(){

    const port = createPort('Passage', (a, b, c)=>{
        console.log(a,b,c)
    })
    
    const handlerClick = (word) => {
        send( port, { 
            typeEvent: 'click',
            word: word.replace('\xA0',' ').replaceAll(/[\.,0-9;:!?¿¡ ]/ig, '') 
        } )
    }

    document.querySelectorAll('.text').forEach( element => {
        try{
            ReactDOM.render(
                <Vers
                    content={element.innerText.split(' ').map( word => {
                        send( port, {
                            typeEvent: 'add',
                            word: word.replace('\xA0',' ').replaceAll(/[\.,0-9;:!?¿¡ ]/ig, '') 
                        })
                        return <ItemWord onClick={handlerClick}>{word}</ItemWord>
                    } )}
                />,
                element
            )
            console.log('done')
        }catch(error){
            console.log(error)
        }       
    })
    
}
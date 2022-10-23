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
            search: document.location.search.match(/search=[a-zA-Z0-9+]{1,}/)[0].split('=')[1],
            version: document.location.search.match(/version=[a-zA-Z0-9]{1,}/)[0].split('=')[1],
            word: word.replace('\xA0',' ').replaceAll(/[\.,0-9;:!?¿¡ ]/ig, '')
        } )
    }

    document.querySelectorAll('.text').forEach( element => {
        try{
            send(port, {
                typeEvent: 'add',
                content: element.innerText.split(' ').map( word => word.match(/[áéíóúäëïöüa-zA-Z0-9]{1,}/)[0] ),
                locationSearch: document.location.search
            })
            ReactDOM.render(
                <Vers
                    content={element.innerText.split(' ').map( word => {
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
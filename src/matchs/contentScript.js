import ReactDOM from 'react-dom'
import { Vers } from '../components'

export default function contentScript(){
    document.querySelectorAll('.text').forEach( element => {
        try{
            ReactDOM.render(
                <Vers content={element.innerText} />,
                element
            )
            console.log('done')
        }catch(error){
            console.log(error)
        }       
    })
    
}
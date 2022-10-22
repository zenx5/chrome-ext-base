import { Matches, Match } from "./components"
import { renderViews, contentScript } from "./matchs" 


// if( /https:\/\/www\.biblegateway\.com\/passage\/./.exec( document.location.href ) !== null ){
//     console.log('contentScript')
//     contentScript()
// }else{
//     renderViews()
// }

export const Index = () =>(
    <Matches>
        <Match pattern='https://www.biblegateway.com/passage/*' />
        <Match default >
    </Matches>
)
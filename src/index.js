import { renderViews, contentScript } from "./matchs" 


if( /https:\/\/www\.biblegateway\.com\/passage\/./.exec( document.location.href ) !== null ){
    console.log('contentScript')
    contentScript()
}else{
    renderViews()
}


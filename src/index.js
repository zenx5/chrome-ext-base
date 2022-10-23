import Matches from "./utils/Matches"
import { renderViews, contentScript } from "./matchs" 


Matches
    .match('https://www.biblegateway.com/passage/*',{js: contentScript})
    .defaultMatch({ js: renderViews })


chrome.runtime.onInstalled.addListener( async function(){
    console.log('Installed!!')
    await chrome.storage.local.set( { library : {} } )
});

chrome.runtime.onConnect.addListener( async function(port) {
    port.onMessage.addListener( async (msg, port) => {
        const { library } = await chrome.storage.local.get('library')
        switch(msg.typeEvent) { 
            case 'add':
                const { content, locationSearch } = msg
                const search = locationSearch.match(/search=[a-zA-Z0-9+]{1,}/)[0].split('=')[1].toLowerCase()
                const version = locationSearch.match(/version=[a-zA-Z0-9]{1,}/)[0].split('=')[1].toLowerCase()
                
                content.map( Word => {
                    const word = Word.replace('\xA0',' ').replaceAll(/[\.,0-9;:!?¿¡ ]/ig, '').toLowerCase()
                    if( library[`${version}`] ){
                        if( library[`${version}`][`${search}`] ) {
                            if( library[`${version}`][`${search}`][`${word}`] ) {
                                library[`${version}`][`${search}`][`${word}`] += 1
                            }else{
                                library[`${version}`][`${search}`][`${word}`] = 1
                            }
                        }else{
                            library[`${version}`][`${search}`] = { [`${word}`] : 1 }
                        }
                    }else{
                        library[`${version}`] = { [`${search}`] : { [`${word}`] : 1 }}
                    }
                })
                await chrome.storage.local.set( { library  } )
                break;
            case 'click': 
                console.log( version, search, word )
                break;
        }
    } )
});


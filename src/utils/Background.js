const get = async (key) => {
    await chrome.storage.local.get(key)
}

const set = async (key, value) => {
    await chrome.storage.local.set(key, value)
}

chrome.runtime.onInstalled.addListener( async function(){
    console.log('Installed!!')
    await set( 'library', {} )
});

chrome.runtime.onConnect.addListener( async function(port) {
    port.onMessage.addListener( async (msg, port) => {
        library = await get('library')
        switch(msg.typeEvent) { 
            case 'add':
                const { version, search, word } = msg
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
                break;
            case 'click': 
                console.log( version, search, word )
                break;
                


        }
    } )
});


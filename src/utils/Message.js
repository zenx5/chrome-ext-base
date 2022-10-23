
export const createPort = (namePort, callback) => {
    const port = chrome.runtime.connect({
        name: namePort
    });
    if( callback ) port.onMessage.addListener( callback )
    return port
}

export const onMessage = ( port, callback ) => {
    port.onMessage.addListener( callback )
}

export const send = ( port, message ) => {
    port.postMessage(message)
}
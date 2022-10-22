
export const createPort = (namePort) => {
    return chrome.runtime.connect({
        name: namePort
    });
}

export const addListenerMessage = ( port, callback ) => {
    port.onMessage.addListener( callback )
}
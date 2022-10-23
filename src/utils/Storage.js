export const get = async (key) => {
    await chrome.storage.local.get(key)
}

export const set = async (key, value) => {
    await chrome.storage.local.set(key, value)
}

export const syncGet = async (key) => {
    await chrome.storage.sync.get(key)
}

export const syncSet = async (key, value) => {
    await chrome.storage.sync.set(key, value)
}


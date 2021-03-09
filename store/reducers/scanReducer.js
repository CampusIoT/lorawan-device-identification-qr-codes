

const initialState = {
    device: {}
}

function parseQRData(data) {
    const words = data.split(':')
    let device = {
        appEUI: words[2],
        devEUI: words[3],
        profileID: words[4]
    }

    if (words.length > 5) {
        device = {
            ...device,
            ownerToken: words.find((elt) => elt.startsWith('O')).substring(1),
            serNum: words.find((elt) => elt.startsWith('S')).substring(1),
            proprietary: words.find((elt) => elt.startsWith('P')).substring(1),
            checksum: words.find((elt) => elt.startsWith('C')).substring(1),
        }
    }
    return device
}

export function scanReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_NODE':
            nextState = {
                ...state,
                device: parseQRData(action.value)
            }
            return nextState || state
        default:
            return state
    }
}
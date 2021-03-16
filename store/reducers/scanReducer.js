

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
            ownerToken: words.find((elt) => {
                elt.startsWith('O') ? elt.startsWith('O').substring(1) : null
            }),
            serNum: words.find((elt) => {
                elt.startsWith('S') ? elt.startsWith('S').substring(1) : null
            }),
            proprietary: words.find((elt) => {
                elt.startsWith('P') ? elt.startsWith('P').substring(1) : null
            }),
            checksum: words.find((elt) => {
                elt.startsWith('C') ? elt.startsWith('C').substring(1) : null
            }),
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
        case 'CHOOSE_NETWORK':
            nextState = {
                ...state,
                selectedNetwork: action.value
            }
            return nextState || state
        case 'CHOOSE_APP':
            nextState = {
                ...state,
                selectedApp: action.value
            }
            return nextState || state
        default:
            return state
    }
}
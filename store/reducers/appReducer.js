const initialState = {
    device: {},
    jwt: "",
}

function parseQRData(data) {
    let words = data.split(':')

    let device = {
        appEUI: words[2],
        devEUI: words[3],
        profileID: words[4]
    }

    if (words.length > 5) {
        let ownerToken, serNum, proprietary, checksum
        words = words.slice(5)
        ownerToken = words.find(elt => elt.startsWith('O'))

        if (ownerToken !== undefined)
            ownerToken = ownerToken.substring(1)

        serNum = words.find(elt => elt.startsWith('S'))

        if (serNum !== undefined)
            serNum = serNum.substring(1)

        proprietary = words.find(elt => elt.startsWith('P'))

        if (proprietary !== undefined)
            proprietary = proprietary.substring(1)

        checksum = words.find(elt => elt.startsWith('C'))

        if (checksum !== undefined)
            checksum = checksum.substring(1)

        device = {
            ...device,
            ownerToken: ownerToken,
            serNum: serNum,
            proprietary: proprietary,
            checksum: checksum
        }
    }

    return device
}

export function appReducer(state = initialState, action) {
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
                selectedApp: action.value.name,
                applicationID: action.value.id
            }
            return nextState || state
        case 'ADD_JWT':
            nextState = {
                ...state,
                jwt: action.value,
            }
            return nextState || state
        case 'DELETE_JWT':
            nextState = {
                ...state,
                jwt: ""
            }
            return nextState || state
        case 'ADD_LOG':
            nextState = {
                ...state,
                login: action.value.login,
                password: action.value.password
            }
            return nextState || state
        default:
            return state
    }
}
export async function getToken(id, pwd) {
    const url = 'https://lns.campusiot.imag.fr/api/internal/login'
    const content = JSON.stringify({ username: id, password: pwd })
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const token = await fetch(url, {
        method: "POST",
        body: content,
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            if (result.code === 16) {
                alert("Username or password are not valid.\nPlease, try again.")
                return -1
            }
            return result.jwt
        })
        .catch(error => {
            alert("Sorry, an issue occured :\n" + error)
            console.log("error", error)
        })

    return token

}

export async function getNumberOfApp(token) {
    const url = 'https://lns.campusiot.imag.fr/api/applications'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)

    const apps = await fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            if (result.code === 16) {
                alert("Session expired.\nPlease, log in.")
                return -1
            }
            return result.totalCount
        })
        .catch(error => {
            alert("Sorry, an issue occured :\n" + error)
            console.log("error", error)
        })
    return apps
}

export async function getAppList(token) {
    const url = 'https://lns.campusiot.imag.fr/api/applications'
    const limit = await getNumberOfApp(token)

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)
    const param = "limit=" + limit

    const appList = await fetch(url + "?" + param, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            if (result.code === 16) {
                alert("Session expired.\nPlease, log in.")
                return -1
            }
            return result
        })
        .catch(error => {
            alert("Sorry, an issue occured :\n" + error)
            console.log("error", error)
        })

    return appList
}

export async function getNumberOfProfile(token) {
    const url = 'https://lns.campusiot.imag.fr/api/device-profiles'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)

    const profileNumber = await fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            if (result.code === 16) {
                alert("Session expired.\nPlease, log in.")
                return -1
            }
            return result.totalCount
        })
        .catch(error => {
            alert("Sorry, an issue occured :\n" + error)
            console.log("error", error)
        })

    return profileNumber
}
export async function getProfile(token) {
    const url = 'https://lns.campusiot.imag.fr/api/device-profiles'
    const limit = await getNumberOfProfile(token)

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)
    const param = "limit=" + limit

    const profileList = await fetch(url + "?" + param, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            if (result.code === 16) {
                alert("Session expired.\nPlease, log in.")
                return -1
            }
            return result
        })
        .catch(error => {
            alert("Sorry, an issue occured :\n" + error)
            console.log("error", error)
        })

    return profileList
}

export async function addDevice(deviceContent, token) {
    const url = 'https://lns.campusiot.imag.fr/api/devices'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)
    const content = JSON.stringify({ device: { ...deviceContent } })
    // console.log(token)
    // console.log(deviceContent)

    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: content
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result)
            if (result.code === 16) {
                alert("Session expired.\nPlease, log in.")
                return -1
            }
            return 0
        })
        .catch(error => {
            alert("Sorry, an issue occured :\n" + error)
            console.log("error", error)
        })

    return res
}
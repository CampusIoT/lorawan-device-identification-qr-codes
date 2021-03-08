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
            return result.jwt
        },
            (error) => {
                return error
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
            return result.totalCount
        },
            (error) => {
                return error
            })
    return apps
}

export async function getAppList(token) {
    const url = 'https://lns.campusiot.imag.fr/api/applications'
    const limit = await getNumberOfApp(token).then(data => data)

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)
    const param = "limit=" + limit

    const appList = await fetch(url + "?" + param, {
        method: "GET",
        headers: headers
    }).then(response => response.json())
        .then(result => {
            return result
        }, (error) => {
            return error
        })

    return appList
}

export function addDevice(token, device, key) {
    const url = 'https://lns.campusiot.imag.fr/api/devices'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)
    const content = JSON.stringify(device)

    fetch(url, {
        method: "POST",
        headers: headers,
        body: content
    }).then(response => response.json())
        .then(result => {
            return result
        }, error => {
            return error
        })
}

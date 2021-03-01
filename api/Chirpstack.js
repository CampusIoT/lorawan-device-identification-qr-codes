export function getToken(id, pwd) {
    const url = 'https://lns.campusiot.imag.fr/api/internal/login'
    const content = JSON.stringify({ username: id, password: pwd })
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return fetch(url, {
        method: "POST",
        body: content,
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            return result
        },
            (error) => {
                return error
            })

}

export function getNumberOfApp(token) {
    const url = 'https://lns.campusiot.imag.fr/api/applications'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)

    return fetch(url, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(result => {
            return result
        },
            (error) => {
                return error
            })
}

export function getAppList(token) {
    const url = 'https://lns.campusiot.imag.fr/api/applications'
    getNumberOfApp(token).then(data => {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Grpc-Metadata-Authorization', 'Bearer ' + token)
        const param = "limit=" + data.totalCount

        return fetch(url + "?" + param, {
            method: "GET",
            headers: headers
        })
    }).then(response => response.json())
        .then(result => {
            return result
        }, (error) => {
            return error
        })
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

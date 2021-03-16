const TTN_URL= 'https://eu1.cloud.thethings.network/api/v3'
const API_KEY = 'NNSXS.WA72CZH2KFB2SWY5FHQOQXZQIPPBQIRJKGOBRIA.TYMDBKXME2BGINAVN4XQRLHSNJQWXBG6GJQMBQT7UDIPQ7IWIHSQ'

export async function getAppList(APIkey){
    const url = TTN_URL + '/applications'
    const headers = new Headers()
    headers.append('Centent-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization','Bearer ' + API_KEY)

    const appList = await fetch(url, {
        method : "GET",
        headers: headers
    })  
    .then(response => response.json())
    .then(result => console.log(result))
    .catch((error) => {
        alert("Sorry error")
        console.log(error)
    })
}
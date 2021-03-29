const TTN_URL= 'https://eu1.cloud.thethings.network/api/v3'

//Constant used to test
// const API_KEY = 'NNSXS.WA72CZH2KFB2SWY5FHQOQXZQIPPBQIRJKGOBRIA.TYMDBKXME2BGINAVN4XQRLHSNJQWXBG6GJQMBQT7UDIPQ7IWIHSQ'

export async function getAppList(APIKey){
    const url = TTN_URL + '/applications'
    const headers = new Headers()
    headers.append('Centent-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization','Bearer ' + APIKey)

    const appList = await fetch(url, {
        method : "GET",
        headers: headers
    })  
    .then(response => response.json())
    .then(result => {
        console.log(result)
        return result})
    .catch((error) => {
        alert("Sorry error")
        console.log(error)
    })
    return appList;
}
// TODO: change default constant to real parametre from store
// Pattern name for ttnform "^[a-z0-9](?:[-]?[a-z0-9]){2,}$\"
export async function addDevice (contentDevice, application, APIKey){
    //  Uncomment for test and change const name
    // const ContentDevice = { device_id : "firstdeviceonapp", application_ids: { applications_id: "test-app-tqt"}, dev_eui:"AABBCCDDEEFF0000", join_eui:"AABBCCDDEEFF0000", dev_addr: "BBAADDCC" }
    // console.log(contentDevice)
    const url = TTN_URL + '/applications/' + application + '/devices'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer ' + APIKey)
    const content = JSON.stringify(contentDevice)
    // console.log(content)

    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: content
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.code === 6) {
                alert("ID already taken.\nPlease, change.")
                return result
            }
            console.log(result.details.cause)
            return result
        })
        .catch(error => {
            alert("Sorry, an issue occured :\n" + error)
            console.log("error", error)
        })

    return res
}
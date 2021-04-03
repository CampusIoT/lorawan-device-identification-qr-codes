import { Alert } from 'react-native'

const TTN_URL= 'https://eu1.cloud.thethings.network/api/v3'

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
        return result})
    .catch((error) => {
        Alert.alert("Error","Could not find applications")
    })
    return appList;
}
// TODO: change default constant to real parametre from store
// Pattern name for ttnform 
export async function addDevice (contentDevice, APIKey){
    //  Uncomment for test and change const name
    // const ContentDevice = { device_id : "firstdeviceonapp", application_ids: { applications_id: "test-app-tqt"}, dev_eui:"AABBCCDDEEFF0000", join_eui:"AABBCCDDEEFF0000", dev_addr: "BBAADDCC" }
    const middleurl = contentDevice.end_device.ids.application_ids.application_id
    const url = TTN_URL + '/applications/' + middleurl + '/devices'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer ' + APIKey)
    const content = JSON.stringify(contentDevice)
    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: content
    })
        .then(response => response.json())
        .then(result => {
            if (result.code === 6) {
                Alert.alert("Error","Device already registered.\nPlease, change.")
                return result.code
            }
            return 0
        })
        .catch(error => {
            Alert.alert("Error","Sorry, an issue occured :\n" + error)
            return -1
        })

    return res
}
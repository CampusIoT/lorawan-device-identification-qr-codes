import { Alert } from 'react-native';



export function storeLogTTN(APIKey) {
    // require the module
    const RNFS = require('react-native-fs');

    // create a path you want to write to
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
    const path = RNFS.DocumentDirectoryPath + '/ttn.json';

    return (
        // write the file
        RNFS.writeFile(path, '{"name" : "The Things Network" , "APIkey" : "' + APIKey + '" }', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            })
    )
}

export function storeLogChirpstack(login, password) {
    // require the module
    const RNFS = require('react-native-fs');

    // create a path you want to write to
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
    const path = RNFS.DocumentDirectoryPath + '/chirpstack.json';

    return (
        // write the file
        RNFS.writeFile(path, '{"name" : "Chirpstack" , "login" : "' + login + '","password" : "' + password + '" }', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            })
    )
}

export function getLogTTN(){
    const RNFS = require('react-native-fs');

    // create a path you want to write to
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
    const path = RNFS.DocumentDirectoryPath+'/ttn.json';

    return (
        RNFS.readFile(path,'utf8')
            .then((contents) => {
                // log the file contents
                 console.log(contents);
                return  JSON.parse(contents)
            })
            .catch((err) => {
                console.log(err.message, err.code);
                return undefined
            })
    )
}

export async function getLogChirpstack(){
    const RNFS = require('react-native-fs');

    // create a path you want to write to
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
    const path = RNFS.DocumentDirectoryPath+'/chirpstack.json';
    const res = await RNFS.readFile(path,'utf8')
    .then((contents) => {
        // log the file contents
        // console.log(contents);
        const data = JSON.parse(contents) 
        // console.log(data)
        return data
    })
    .catch((err) => {
        console.log(err.message, err.code);
        return undefined
    })

    return (
       res
    )
}
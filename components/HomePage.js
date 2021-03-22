import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Button } from '@ui-kitten/components'
import Scanner from './Scanner';
import { DeviceEventEmitter } from 'react-native'

function HomePage(props) {


    const [isScan, setScan] = useState(false)

    DeviceEventEmitter.addListener("event.setScan", () => { setScan(true) })

    const _mainDisplay = () => {
        return (
            <>
                <View style={styles.screen}>
                    <Text style={styles.text}>ScanWAN</Text>
                    <TouchableOpacity style={styles.touchable} onPress={() => setScan(true)}>
                        <Image style={styles.qrcode} source={require("../assets/qrcode.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.button_view}>
                    <Button style={styles.button} onPress={() => props.navigation.navigate("NetworkSelection")}>
                        Select a network
                    </Button>
                    <Button style={styles.button} disabled={true}>
                        Select an application
                    </Button>
                </View>
            </>
        )
    }

    const _scan = () => {
        return (
            <Scanner setScan={setScan} navigation={props.navigation} />
        )
    }


    return (
        <SafeAreaView style={styles.main_view}>
            { isScan && _scan()}
            { !isScan && _mainDisplay()}
        </SafeAreaView>

    )


}

const styles = StyleSheet.create({
    main_view: {
        flex: 1
    },
    screen: {
        flex: 2,
        justifyContent: "space-around",
        alignItems: 'center',
    },

    touchable: {
        borderRadius: 20,
        marginTop: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 36
    },
    button_view: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        width: "80%"
    }


})

export default HomePage
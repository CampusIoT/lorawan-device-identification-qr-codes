import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Button } from '@ui-kitten/components'
import Scanner from './Scanner';
import { DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'

function HomePage(props) {


    const [isScan, setScan] = useState(false)
    const [isSelectedN, getSelectedN] = useState(false)
    const [isSelectedA, getSelectedA] = useState(false)

    DeviceEventEmitter.addListener("event.setScan", () => { setScan(true) })
    DeviceEventEmitter.addListener("event.Selected", () => { getSelectedN(true) })
    DeviceEventEmitter.addListener("event.Selected", () => { getSelectedN(true) })

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
                      { !isSelectedN ?  'Select a network' : props.selectedNetwork + ' is selected' }
                    </Button>
                    <Button style={styles.button} disabled={!isSelectedN}>
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
        width: "80%",
        margin: 20
    }


})

const mapStateToProps = (state) => {
    return { selectedNetwork: state.selectedNetwork,
             selectedApp : state.selectedApp }
}

export default connect(mapStateToProps)(HomePage)
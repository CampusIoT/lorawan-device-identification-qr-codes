import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import Scanner from './Scanner';
import { DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'

function HomePage(props) {


    const [isScan, setScan] = useState(false)
    const [isSelectedN, getSelectedN] = useState(false)
    const [isSelectedA, getSelectedA] = useState(false)

    DeviceEventEmitter.addListener("event.setScan", () => { setScan(true) })
    DeviceEventEmitter.addListener("event.SelectedN", () => { getSelectedN(true), getSelectedA(false), props.selectedApp = '' })
    DeviceEventEmitter.addListener("event.SelectedA", () => { getSelectedA(true) })


    const _mainDisplay = () => {
        return (
            <>
                <View style={styles.screen}>
                    <Text style={styles.text}>ScanWAN</Text>
                    <TouchableOpacity style={styles.touchable} onPress={() => {
                        // console.log(props.jwt)
                        if (props.selectedNetwork === undefined) {
                            alert("Error, please choose a network ! ")
                        } else if (props.selectedApp === undefined) {
                            alert("Error, please choose a application ! ")
                        } else {
                            setScan(true)
                        }
                    }
                    }>
                        <Image style={styles.qrcode} source={require("../assets/qrcode.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.button_view}>
                    <Button style={styles.button} onPress={() => props.navigation.navigate("NetworkSelection")}>
                        {!isSelectedN ? 'Select a network' : props.selectedNetwork + ' is selected'}
                    </Button>
                    <Button style={styles.button} onPress={() => props.navigation.navigate("ApplicationSelection")} disabled={!isSelectedN}>
                        {!isSelectedA ? 'Select an application ' : props.selectedApp + ' is selected'}
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
        margin: 20,
        textAlign: 'center'
    }


})

const mapStateToProps = (state) => {
    return {
        selectedNetwork: state.selectedNetwork,
        selectedApp: state.selectedApp,
        jwt: state.jwt
    }
}

export default connect(mapStateToProps)(HomePage)
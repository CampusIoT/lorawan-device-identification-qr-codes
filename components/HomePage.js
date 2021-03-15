import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import { Button } from '@ui-kitten/components'
import Scanner from './Scanner';


function HomePage(props) {

    const [isScan, setScan] = useState(false)

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
                    <Button style={styles.button} onPress={() => this.props.navigation.navigate("NetworkSelection")}>
                        Select a network
                    </Button>
                    <Button style={styles.button} disabled={true}>
                        Select an application
                    </Button>
                </View>
            </>
        )
    }

    const _goBack = () => {
        setScan(false)
    }

    const _scan = () => {
        return (
            <Scanner goBack={_goBack} />
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
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 24
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
import React, { Component } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import { Text, Button } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'

class Scanner extends Component {
    constructor(props) {
        super(props)
    }

    onSuccess = elt => {
        //Navigate to form and update maybe state to initialise placeholder
        console.log(elt.data)
    }

    render() {
        return (
            <View style={styles.scan_view}>
                <QRCodeScanner
                    reactivate={true}
                    reactivateTimeout={2500}
                    onRead={this.onSuccess}
                    flasMode={RNCamera.Constants.FlashMode.auto}
                    topContent={
                        <Text style={styles.textBold} >
                            Flasher le QR Code du système LoRa
                        </Text >
                    }
                    bottomContent={
                        <Button onPress={this.props.goBack}> Retour </Button>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scan_view: {
        flex: 1,
    }
})

export default Scanner
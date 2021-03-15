import React, { Component } from 'react'
import { connect } from 'react-redux'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import { Text, Button } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'

class Scanner extends Component {
    constructor(props) {
        super(props)
    }

    _onSuccess = elt => {
        //Navigate to form and update maybe state to initialise placeholder
        this.props.dispatch({ type: 'ADD_NODE', value: elt.data })
        this.props.navigation.navigate('Forms')
        this.props.scanned()
    }

    _goBack = () => {
        this.props.scanned()
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.scan_view}>
                <QRCodeScanner
                    reactivate={true}
                    reactivateTimeout={2500}
                    onRead={this._onSuccess}
                    flasMode={RNCamera.Constants.FlashMode.auto}
                    topContent={
                        <Text style={styles.textBold} >
                            Flasher le QR Code du système LoRa
                        </Text >
                    }
                    bottomContent={
                        <Button onPress={this._goBack}> Retour </Button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner)
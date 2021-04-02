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
        const ds = elt.data.split(':')
        if (ds.length !== 0 && ds[0] === "LW" ) {
            this.props.dispatch({ type: 'ADD_NODE', value: elt.data })
            this.props.navigation.navigate('Forms', {disabled : true})
            this.props.setScan(false)
        } else {
            alert("The QR Code is not a LoRaWAN's")
        }
    }

    _goBack = () => {
        this.props.setScan(false)
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
                            Flash LoRaWAN QR Code
                        </Text >
                    }
                    bottomContent={
                        <Button onPress={this._goBack}> Go back </Button>
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
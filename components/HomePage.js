import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import Scanner from './Scanner';
import { DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isScan: false,
            isSelectedN: false,
            isSelectedA: false
        }
    }

    _setScan = (bool) => {
        this.setState({ isScan: bool })
    }

    _getSelectedN = (bool) => {
        this.setState({ isSelectedN: bool })
    }

    _getSelectedA = (bool) => {
        this.setState({ isSelectedA: bool })
    }

    componentDidMount() {
        DeviceEventEmitter.addListener("event.setScan", () => { this._setScan(true) })
        DeviceEventEmitter.addListener("event.SelectedN", () => { this._getSelectedN(true), this._getSelectedA(false), this.props.selectedApp = '' })
        DeviceEventEmitter.addListener("event.SelectedA", () => { this._getSelectedA(true) })
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners()
    }



    _mainDisplay = () => {
        return (
            <>
                <View style={styles.screen}>
                    <Text style={styles.text}>ScanWAN</Text>

                    <View style={styles.registerButtons}>
                        <TouchableOpacity style={styles.touchable} onPress={() => {
                            if (this.props.selectedNetwork === undefined) {
                                Alert.alert("Error", "Please choose a network ! ")
                            } else if (this.props.selectedApp === undefined) {
                                Alert.alert("Error", "Please choose a application ! ")
                            } else {
                                this._setScan(true)
                            }
                        }
                        }>
                            <Image style={styles.qrcode} source={require("../assets/qrcode.png")} />
                        </TouchableOpacity>

                        <Button style={styles.manual_button} appearance='ghost' onPress={() => {
                            if (this.props.selectedNetwork === undefined) {
                                Alert.alert("Error", "Please choose a network ! ")
                            } else if (this.props.selectedApp === undefined) {
                                Alert.alert("Error", "Please choose a application ! ")
                            } else {
                                this.props.navigation.navigate('Forms', { disabled: false })
                            }
                        }
                        }>
                            Add a device manually
                        </Button>
                    </View>

                </View>
                <View style={styles.button_view}>
                    <Button style={styles.button} onPress={() => this.props.navigation.navigate("NetworkSelection")}>
                        {!this.state.isSelectedN ? 'Select a network' : this.props.selectedNetwork + ' is selected'}
                    </Button>
                    <Button style={styles.button} onPress={() => this.props.navigation.navigate("ApplicationSelection")} disabled={!this.state.isSelectedN}>
                        {!this.state.isSelectedA ? 'Select an application ' : this.props.selectedApp + ' is selected'}
                    </Button>
                </View>
            </>
        )
    }

    _scan = () => {
        return (
            <Scanner setScan={this._setScan} navigation={this.props.navigation} />
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.main_view} >
                { this.state.isScan && this._scan()}
                { !this.state.isScan && this._mainDisplay()}
            </SafeAreaView >
        )

    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1
    },
    screen: {
        flex: 2,
        justifyContent: "space-around",
        alignItems: 'center'
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
    },
    manual_button: {
        width: "60%",
        margin: 20,
        textAlign: 'center'
    },
    registerButtons: {
        alignItems: 'center',
        width: '100%',
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
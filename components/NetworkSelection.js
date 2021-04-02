import { Text, Button, ButtonGroup } from '@ui-kitten/components'
import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ChirpstackForm from './forms/ChirpstackForm';
import NetworkItem from './NetworkItem'
import { getLogChirpstack, getLogTTN, storeLogChirpstack, storeLogTTN } from './Storage';

const networks = ['Chirpstack', 'TTN']

class NetworkSelection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            networks: []
        }
    }

    componentDidMount() {
        getLogChirpstack()
            .then(data => {
                if (data !== undefined) {
                    data = {
                        ...data,
                        image: require("../assets/logo_chirpstack.png"),
                        id: "0"
                    }
                    let nets = [data]
                    this.setState({ networks: nets })
                }
            })
            .catch(error => alert(error));
        getLogTTN()
            .then(data => {
                if (data !== undefined) {
                    data = {
                        ...data,
                        image: require("../assets/logo_ttn.png"),
                        id: "1"
                    }
                    let nets = [...this.state.networks, data]
                    this.setState({ networks: nets })
                }
            })
            .catch(error => alert(error));
    
        return
    }

    render() {
        return (
            <SafeAreaView style={styles.safe}>
                <View>
                    <Text style={styles.title}>Network Selection</Text>
                    <Text style={styles.instruction}> Select a network to register your node in</Text>
                </View>
                <FlatList
                    data={this.state.networks}
                    renderItem={(item) => <NetworkItem network={item.item} navigator={this.props.navigation} />}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={renderSeparator}
                />

                <View style={styles.buttons_view}>
                    <Text appearance='hint'> Add a new Network Account </Text>
                    <ButtonGroup status='info'>
                        <Button onPress={this._addChirpstackAccount}> Chirpstack </Button>
                        <Button onPress={this._addTTNAccount}> TTN </Button>
                    </ButtonGroup>
                </View>

            </SafeAreaView>
        )
    }
}

const renderSeparator = () => {
    return (
        <View style={{ backgroundColor: 'black', height: 1, marginLeft: 10, marginRight: 10 }} />
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    buttons_view: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 15
    },

    instruction: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20
    }
})

export default NetworkSelection;
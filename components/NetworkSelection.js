import { Text, Button, ButtonGroup } from '@ui-kitten/components'
import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native'
import NetworkItem from './NetworkItem'

const networks = ['Chirpstack', 'TTN']

class NetworkSelection extends React.Component {
    constructor(props) {
        super(props)
        this.networks = [{
            id: '1',
            name: 'Chirpstack',
            image: require('../assets/logo_chirpstack.png'),
            login: 'GuestSandbox',
            password: 'mF3rC3tD8hA8hH5j'
        },
        {
            id: '2',
            name: 'The Things Network',
            image: require('../assets/logo_ttn.png'),
            login: '',
            apiKey: 'NNSXS.WA72CZH2KFB2SWY5FHQOQXZQIPPBQIRJKGOBRIA.TYMDBKXME2BGINAVN4XQRLHSNJQWXBG6GJQMBQT7UDIPQ7IWIHSQ'
        },
        ]
    }

    _addChirpstackAccount = () => {
        this.props.navigation.navigate('ChirpstackLogin')
    }

    _addTTNAccount = () => {
        this.props.navigation.navigate('TTNLogin')
    }

    render() {
        return (
            <SafeAreaView style={styles.safe}>
                <View>
                    <Text style={styles.title}>Network Selection</Text>
                    <Text style={styles.instruction}> Select a network to register your node in</Text>
                </View>
                <FlatList
                    data={this.networks}
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
import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text } from 'react-native'
import {connect} from 'react-redux'
import NetworkItem from './NetworkItem'

class NetworkSelection extends React.Component {
    constructor(props){
        super(props)
        this.networks = [{id: '1',
                         name: 'Chirpstack',
                         image: require('../assets/logo_chirpstack.png'),
                         login: 'login@example.com'},
                        {id: '2',
                         name: 'The Things Network',
                         image: require('../assets/logo_ttn.png'),
                         login: 'login@example.com'},]
    }

    render(){
        return (
            <SafeAreaView>
                <View>
                <Text style={styles.title}>Network Selection</Text>
                <Text style={styles.instruction}> Select a network to register your node in</Text>
                </View>
                <FlatList
                    data={this.networks}
                    renderItem = {({item}) => <NetworkItem network={item}
                    keyExtracotr={item => item.id}
                    ItemSeparatorComponent={renderSeparator} />
                }
                />
            </SafeAreaView>
        )
    }
}

const renderSeparator = () => {
    return (
        <View style={{backgroundColor: 'black', height: 10}}/>
    );
}

const _getNewtork = async() => {
    let map = _buildFetcherMap()
    let fetcher = map[selectedNetwork]
    let newtork = await fetcher
    return(newtork)   
}

const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}
const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSelection);
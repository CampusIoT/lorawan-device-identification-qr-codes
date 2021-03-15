import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native'

class NetworkItem extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const network = this.props.network
        return (
            <TouchableHighlight underlayColor='#BFBFBF' onPress={() => alert('Malone take of care this')}>
                <View style={styles.main_container}>
                    <View style={styles.image_container}>
                        <Image style={styles.image} source={require('../assets/logo_chirpstack.png')}/>
                    </View>
                    
                    <View style={{ borderRightWidth: 1, borderRightColor: 'grey', }} />
                    
                    <View style={styles.details_container}>
                        <Text style={styles.name}>{network.name}</Text>
                        <Text style={styles.login}>{network.login}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        margin: 10,
    },

    image_container: {
        width: 120
    },

    image:{
        flex: 1,
        resizeMode: 'contain',
        width: 110,
        height: undefined,
        margin: 5
    },

    details_container: {
        flex: 1,  
        justifyContent: 'center',
    },

    name: {
        fontSize: 24,
        fontWeight: '500',
        margin: 10
    },

    login: {
        fontSize: 16,
        margin: 10
    },

})

export default NetworkItem;
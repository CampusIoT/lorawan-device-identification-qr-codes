import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'

class ApplicationItem extends React.Component {
    constructor(props){
        super(props)
    }

    selectApplication(app){
        this.props.dispatch({type: 'CHOOSE_APP', value: app.name})
        DeviceEventEmitter.emit("event.SelectedA")
        DeviceEventEmitter.removeAllListeners()
        this.props.navigator.popToTop()
    }

    ttnItem(application){
        return(
            <TouchableHighlight underlayColor='#BFBFBF' onPress={() => this.selectApplication(application)}>
                <View style={styles.main_container}>
                    <View style={styles.title_container}>
                        <Text style={styles.name}>{application.ids.application_id}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    chirpstackItem(application){
        return (
            <TouchableHighlight underlayColor='#BFBFBF' onPress={() => this.selectApplication(application)}>
                <View style={styles.main_container}>
                    <View style={styles.title_container}>
                        <Text style={styles.name}>{application.name}</Text>
                    </View>
                    <View style={styles.details_container}>
                        <Text style={styles.description}>{application.description}</Text>
                    </View>
                </View>
          </TouchableHighlight>
        )
    }

    render() {
        const application = this.props.application
        return this.props.selectedNetwork === 'Chirpstack' ? this.chirpstackItem(application) : this.ttnItem(application)
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },

    title_container: {
        flex: 1
    },

    details_container: {
        flex: 2,
        flexDirection: 'row',  
    },

    name: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
    },

    description: {
        marginLeft: 5,
    },

})

const mapStateToProps = (state) => {
    return {selectedNetwork: state.selectedNetwork}
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationItem);
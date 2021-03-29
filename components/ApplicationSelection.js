import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, FlatList } from 'react-native'
import {connect} from 'react-redux'
import ApplicationItem from './ApplicationItem.js'
import {getAppList as ChirpstackFetcher, getToken} from '../api/Chirpstack.js'
//import {getAppList as TTNFetcher} from '../api/Chirpstack.js'

class ApplicationSelection extends React.Component {
    constructor(props){
        super(props)
        this.state = {applications: []}
    }

    async componentDidMount(){ 
        let applications
        let token = await getToken('GuestSandbox', 'xxxxxx')
        applications = ChirpstackFetcher(token).then(data =>  this.setState({applications: data.result}) ).catch(error => alert('error\n' + error))
    }

    render(){
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.applications}
                    renderItem = {({item}) => <ApplicationItem application={item} navigator={this.props.navigation}/>}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={renderSeparator} 
                />
            </SafeAreaView>
        )
    }
}

const renderSeparator = () => {
    return (
        <View style={{backgroundColor: 'black', height: 1, margin: 10}}/>
    );
}

const _getApplications = async () => {
    let applications
    let token = await getToken('GuestSandbox', 'xxxxxx')
    if(this.props.selectedNetwork === 'Chirpstack')
        applications = await ChirpstackFetcher(token) // await ChirpstackFetcher(this.props.jwt)
    else 
    //   applications = await TTNFetcher(this.props.jwt)
    return(applications.result)   
}

const mapStateToProps = (state) => {
    return {selectedNetwork: state.selectedNetwork,
            jwt: state.jwt}
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps)(ApplicationSelection)
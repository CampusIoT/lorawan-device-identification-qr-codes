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

    componentDidMount(){ 
        let applications
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGlycHN0YWNrLWFwcGxpY2F0aW9uLXNlcnZlciIsImV4cCI6MTYxNjU5NzI1OSwiaXNzIjoiY2hpcnBzdGFjay1hcHBsaWNhdGlvbi1zZXJ2ZXIiLCJuYmYiOjE2MTY1MTA4NTksInN1YiI6InVzZXIiLCJ1c2VybmFtZSI6Ikd1ZXN0U2FuZGJveCJ9.F1Vbx6hM27p5jz4Ay_ut53Jnk-JpS9kyKREUiCQTrak'
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
    let token = await getToken('GuestSandbox', 'mF3rC3tD8hA8hH5j')
    console.log(token)
    //if(this.props.selectedNetwork === 'Chirpstack')
    //applications = await ChirpstackFetcher(this.props.jwt)
    applications = await ChirpstackFetcher(token)
    //else 
    //   applications = await TTNFetcher(this.props.jwt)
    //console.log(applications)
    return(applications.result)   
}

const mapStateToProps = (state) => {
    return {selectedNetwork: state.selectedNetwork,
            jwt: state.jwt}
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps)(ApplicationSelection)
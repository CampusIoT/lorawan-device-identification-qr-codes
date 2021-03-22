import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList } from 'react-native'
import {connect} from 'react-redux'
import {getAppList as ChirpstackFetcher} from '../api/Chirpstack.js'

class ApplicationSelection extends React.Component {
    constructor(props){
        super(props)
        this.applications = _getApplications()
    }

    render(){
        return (
            <SafeAreaView>
                <FlatList
                    data={this.applications}
                    renderItem = {({item}) => <ApplicationItem application={item}
                    keyExtracotr={item => item.id} /> }
                />
            </SafeAreaView>
        )
    }
}

// return a map -> <NetworkName, ApplicationFetcher>
const _buildFetcherMap = () => {
    let map = {};
    map.Chirpstack = Chirpstack.ChirpstackFetcher(this.jwt_Chirpstack)
    return(map)
}

const _getApplications = async() => {
    let map = _buildFetcherMap()
    let fetcher = map[selectedNetwork]
    let applications = await fetcher
    return(applications)   
}

const mapStateToProps = (state) => {
    return {selectedNetwork: state.selectedNetwork,
            jwt_Chirpstack: state.jwt_Chirpstack}
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps)(ApplicationSelection)
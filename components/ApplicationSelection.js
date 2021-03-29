import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ApplicationItem from './ApplicationItem.js'
import { getAppList as ChirpstackFetcher, getToken } from '../api/Chirpstack'
import { getAppList as TTNFetcher } from '../api/TTN'

class ApplicationSelection extends React.Component {
    constructor(props) {
        super(props)
        this.state = { applications: [] }
    }

    async componentDidMount() {
        let applications
        let token = this.props.jwt
        if (this.props.selectedNetwork === 'Chirpstack')
            applications = ChirpstackFetcher(token).then(data => this.setState({ applications: data.result })).catch(error => alert('error\n' + error))
        else
            applications = TTNFetcher(token).then(data => {
                let tmp = data.applications
                let app = []
                tmp.map((obj) => { app.push(obj.ids) })
                this.setState({ applications: app })
            }).catch(error => alert('error\n' + error))
    }

    render() {
        // console.log(this.state.applications)
        return (

            <SafeAreaView>
                <FlatList
                    data={this.state.applications}
                    renderItem={({ item }) => <ApplicationItem application={item} navigator={this.props.navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={renderSeparator}
                />
            </SafeAreaView>
        )
    }
}

const renderSeparator = () => {
    return (
        <View style={{ backgroundColor: 'black', height: 1, margin: 10 }} />
    );
}

const mapStateToProps = (state) => {
    return {
        selectedNetwork: state.selectedNetwork,
        jwt: state.jwt
    }
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps)(ApplicationSelection)
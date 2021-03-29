import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import ChirpstackForm from './forms/ChirpstackForm';
import { getProfile } from '../api/Chirpstack';
import { connect } from 'react-redux'

const arrowBackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back-outline' />
);

class NodeRegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        let isSubscribed = true
        getProfile(this.props.jwt).then(data => isSubscribed ? this.setState({ profiles: data.result, loading: false }) : null).catch(error => alert('error\n' + error))
        return () => isSubscribed = false
    }

    _display_form(profiles) {
        const api = this.props.selectedNetwork
        if (api === 'Chirpstack'){
            return <ChirpstackForm profiles={profiles} navigation={this.props.navigation} />
        } else {
            return <TTNForm navigation={this.props.navigation} />
        }

    }

    render() {
        return (
            <View style={styles.main_view}>
                <View style={styles.restart_view}>
                    <Button
                        style={styles.button}
                        accessoryLeft={arrowBackIcon}
                        onPress={() => console.log("Restart pressed")}>
                        Restart registration
                    </Button>
                </View>
                {!this.state.loading && this._display_form(this.state.profiles)}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main_view: {
        flex: 1
    },
    restart_view: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    form_view: {
        flex: 1,
    },
    button: {
        marginRight: "4%",
        marginTop: "2%"
    }
})

const mapStateToProps = (state) => {
    return {
        jwt: state.jwt,
        selectedNetwork: state.selectedNetwork
    }
}

export default connect(mapStateToProps)(NodeRegisterPage)
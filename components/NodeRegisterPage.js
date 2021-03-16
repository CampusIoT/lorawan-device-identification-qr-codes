import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import ChirpstackForm from './forms/ChirpstackForm';
import { getProfile } from '../api/Chirpstack';


const checkIcon = (props) => (
    <Icon {...props} name='done-all-outline' />
);

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
        this.setState({loading: true})
        let isSubscribed = true
        getProfile("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGlycHN0YWNrLWFwcGxpY2F0aW9uLXNlcnZlciIsImV4cCI6MTYxNTk5Mjg1NywiaXNzIjoiY2hpcnBzdGFjay1hcHBsaWNhdGlvbi1zZXJ2ZXIiLCJuYmYiOjE2MTU5MDY0NTcsInN1YiI6InVzZXIiLCJ1c2VybmFtZSI6Ikd1ZXN0U2FuZGJveCJ9.Kt0U1vJpjT02MRIGdt5o_kRkofEWKQ---x8wXC91UmI").then(data => isSubscribed ? this.setState({ profiles: data.result, loading: false }) : null).catch(error => alert('error\n' + error))
        return () => isSubscribed = false
    }

    _display_form(profiles) {
        //     const api = state.api
        //     if (api === 'chirpstack'){
        return <ChirpstackForm profiles={profiles} navigation={this.props.navigation} />
        //     }
        //     else if (api === 'TTN'){
        //         return (
        //             <TTNFrom></TTNFrom>
        //         );
        //     }

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

export default NodeRegisterPage
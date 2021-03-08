import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import {
    Button,
    Icon
} from '@ui-kitten/components';
import ChirpstackForm from './forms/ChirpstackForm';


const checkIcon = (props) => (
    <Icon {...props} name='done-all-outline' />
);

const arrowBackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back-outline' />
);


class NodeRegisterPage extends React.Component {

    _display_form() {
        //     const api = state.api
        //     if (api === 'chirpstack'){
        return (
            <ChirpstackForm></ChirpstackForm>
        );
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
                {this._display_form()}
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
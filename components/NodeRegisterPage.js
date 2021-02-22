import React from 'react'
import { StyleSheet, Button, View } from 'react-native'


class NodeRegisterPage extends React.Component {

    // _display_form(){
    //     const api = state.api
    //     if (api == chirpstack){
    //         return(
    //             <ChirpstackForm></ChirpstackForm>
    //         );
    //     }
    //     else if (api == TTN){
    //         return (
    //             <TTNFrom></TTNFrom>
    //         );
    //     }
    // }

    render() {
        return (
            <View>
                <View style={styles.restart_view}>
                    <Button
                        style={styles.restart_button}
                        accessoryLeft={arrow-ios-back-outline}
                        onPress={toggleTooltip}>
                        Restart registration
                    </Button>
                </View>

                <View style={{ flex: 10 }}>
                    {/*_display_form() */}
                </View>


                <Button
                    style={styles.submit_button}
                    accessoryLeft={checkmark-outline}
                    onPress={toggleTooltip}>
                    Submit
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    restart_view: {
        flex: 1,
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    submit_button: {
        flex: 1,
        backgroundColor: "yellow"
    },
    form_view :{
        flex:1,
        backgroundColor:"blue"
    }
})

export default NodeRegisterPage
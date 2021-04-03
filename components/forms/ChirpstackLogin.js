import React from "react";
import { SafeAreaView, View, StyleSheet, DeviceEventEmitter } from "react-native";
import { Text, Icon, Card, Button, Input } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux'
import { storeLogChirpstack } from '../Storage'

const checkIcon = (props) => (
    <Icon {...props} name='done-all-outline' />
);

function ChirpstackLogin(props) {
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = async data => {
        storeLogChirpstack(data.login, data.passwd)
        DeviceEventEmitter.emit("event.clear")
        props.dispatch({type:'CLEAR', value:''})
        props.navigation.popToTop()
    }

    return (
        <SafeAreaView style={styles.main_view}>

            <Text style={styles.title}> Chirpstack Login </Text>

            <Card style={styles.card} status='primary' disabled={true}>
                <View style={styles.view_form}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <>
                                <Text category="p1">Login</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            </>
                        )}
                        name="login"
                        rules={{ required: true }}
                        defaultValue=""
                    />

                    {errors.login && <Card status='danger'><Text> You must have to put a login </Text></Card>}

                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <>
                                <Text category="p1">Password</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    secureTextEntry={true}
                                />
                            </>
                        )}
                        name="passwd"
                        rules={{ required: true }}
                        defaultValue=""
                    />

                    {errors.passwd && <Card status='danger'><Text> You must have to put a password </Text></Card>}
                </View>
            </Card>

            <Button
                style={styles.button}
                accessoryLeft={checkIcon}
                onPress={handleSubmit(onSubmit)}>
                Submit
            </Button>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    main_view: {
        paddingTop: '2%',
        flex: 1,
    },
    field: {
        justifyContent: "flex-end",
        flexDirection: 'row',
        flex: 1
    },
    input: {
        backgroundColor: "white",
        height: 40,
        borderWidth: 0.1,
        borderRadius: 4
    },
    card: {
        marginLeft: '2%',
        marginRight: '2%'
    },
    button: {
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '2%'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 15
    }
})

const mapStateToProps = (state) => {
    return {}
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChirpstackLogin)
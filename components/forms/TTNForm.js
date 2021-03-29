import React from "react";
import { ScrollView, View, TextInput, Alert, StyleSheet, DeviceEventEmitter } from "react-native";
import { Text, Icon, Card, Button, Input } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux'
import { addDevice } from '../../api/ttn'

const checkIcon = (props) => (
    <Icon {...props} name='done-all-outline' />
);

function TTNForm(props) {
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = async data => {
        const rexp = new RegExp('-', 'g')
        // device.props.application=
        // const pid = props.profiles[selectedIndex.row].id.replace(rexp, "")
        data = {
            end_device: {
                ids: {
                    device_id: data.device_id,
                    dev_eui: data.dev_eui,
                    join_eui: data.join_eui,
                    applications_ids: {
                        application_id: "test-app-tqt" 
                    },
                    dev_addr: "00000000"
                },
                name: data.name,
                description: data.description
            }
        }
        console.log(data)
        console.log(data.end_device.ids.applications_ids)
        const res = await addDevice(data, "test-app-tqt", 'NNSXS.WA72CZH2KFB2SWY5FHQOQXZQIPPBQIRJKGOBRIA.TYMDBKXME2BGINAVN4XQRLHSNJQWXBG6GJQMBQT7UDIPQ7IWIHSQ')//add token value from redux)

        if (Object.keys(res).length === 0) {
            alert("The device has correctly been added")
            DeviceEventEmitter.emit("event.setScan")
            DeviceEventEmitter.removeAllListeners();
            props.navigation.navigate('Home')

        } else {
            alert("An error occured, please try again.")
        }
    }

    const setDefault = name => {
        switch (name) {
            case 'name':
                return "dehkugyufgukfkuiuykd"
            case 'description':
                return 'A new device'
            default:
                alert("PANIC! => set default value in chirpstack form")
        }
    }

    return (
        <ScrollView style={styles.main_view}>

            <Card style={styles.card} status='primary' disabled={true}>
                <View style={styles.view_form}>

                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <>
                                <Text category="p1">Device Name</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            </>
                        )}
                        name="name"
                        rules={{ required: false }}
                        defaultValue=""
                    />

                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <>
                                <Text category="p1">Device ID</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            </>
                        )}
                        name="device_id"
                        defaultValue={setDefault('name')}
                    />


                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <>
                                <Text category="p1">Description</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            </>
                        )}
                        name="description"
                        defaultValue={setDefault('description')}
                    />

                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <>
                                <Text category="p1">DevEUI</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    disabled={true}
                                />
                            </>
                        )}
                        name="dev_eui"
                        defaultValue={props.device.devEUI}
                    />

                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <>
                                <Text category="p1">AppEUI</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    disabled={true}
                                />
                            </>
                        )}
                        name="join_eui"
                        defaultValue={props.device.appEUI}
                    />


                </View>


            </Card>

            <Button
                style={styles.button}
                accessoryLeft={checkIcon}
                onPress={handleSubmit(onSubmit)}>
                Submit
                </Button>

        </ScrollView >

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
    }
})

const mapStateToProps = (state) => {
    return {
        device: state.device
    }
}

export default connect(mapStateToProps)(TTNForm)
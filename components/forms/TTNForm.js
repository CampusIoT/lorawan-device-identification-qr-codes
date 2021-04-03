import React, {useState} from "react";
import { ScrollView, View, Alert, StyleSheet, DeviceEventEmitter} from "react-native";
import { Text, Icon, Card, Button, Input, CheckBox } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux'
import { addDevice } from '../../api/TTN'

const checkIcon = (props) => (
    <Icon {...props} name='done-all-outline' />
);

function TTNForm(props) {
    const { control, handleSubmit, errors } = useForm({mode:'onChange'});
    const [checked, setChecked] = useState(false)
 
    const regex1 = /^[a-z0-9](?:[-]?[a-z0-9]){2,}$/


    const onSubmit = async data => {
        data = {
            end_device: {
                ids: {
                    device_id: data.device_id,
                    dev_eui: data.dev_eui,
                    join_eui: data.join_eui,
                    application_ids: {
                        application_id: props.appID
                    },
                    dev_addr: "00000000"
                },
                name: data.name,
                description: data.description
            }
        }

        const res = await addDevice(data, props.jwt)

        if (res === 0) {
            Alert.alert("Succes","The device has correctly been added")
            if (props.disabled === true){
                DeviceEventEmitter.emit("event.setScan")
            }
            props.navigation.popToTop()
        }
    }

    const setDefault = name => {
        switch (name) {
            case 'name':
                return props.device.devEUI !== undefined ? "dev" + props.device.devEUI.substring(0, 4).toLowerCase() : "device"
            case 'description':
                return 'A new device'
            default:
                Alert.alert("PANIC! => set default value in chirpstack form")
        }
    }

    return (
        <ScrollView style={styles.main_view}>

            <Card style={styles.card} status='primary' disabled={props.disabled}>
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
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                            </>
                        )}
                        name="name"
                        rules={{ pattern: regex1 }}
                        defaultValue=""
                    />

                    {errors.name && <Card status='danger'><Text>The name has to contain small caps and number only and a length > 2! </Text></Card>}


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
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                            </>
                        )}
                        rules={{ pattern: regex1 }}
                        name="device_id"
                        defaultValue={setDefault('name')}
                    />
                    {errors.device_id && <Card status='danger'><Text>The name has to contain small caps and number only and a length > 2! </Text></Card>}


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
                                    multiline={true}
                                    maxLength={2000}
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
                                    disabled={props.disabled}
                                />
                            </>
                        )}
                        name="dev_eui"
                        defaultValue={props.device.devEUI !== undefined ? props.device.devEUI : ""}
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
                                    disabled={props.disabled}
                                />
                            </>
                        )}
                        name="join_eui"
                        defaultValue={props.device.appEUI !== undefined ? props.device.appEUI : ""}
                    />


                </View>


            </Card>

            <Button
                style={styles.button}
                accessoryLeft={checkIcon}
                onPress={handleSubmit(onSubmit)}
                disabled={!checked}>
                
                Submit
            </Button>

            <CheckBox style={styles.check}
                checked={checked}
                onChange={nextChecked => setChecked(nextChecked)}>
                <Text status='info'> I accept all certificates of authority (CA) </Text>
            </CheckBox>

        </ScrollView >

    )
}

const styles = StyleSheet.create({
    check: {
        justifyContent: 'center',
        marginTop: '5%'
    },
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
        device: state.device,
        jwt: state.jwt,
        appID: state.applicationID
    }
}

export default connect(mapStateToProps)(TTNForm)
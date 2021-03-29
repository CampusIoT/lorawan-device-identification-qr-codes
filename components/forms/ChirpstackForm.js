import React, { useState } from "react";
import { ScrollView, View, StyleSheet, DeviceEventEmitter } from "react-native";
import { Text, Icon, Card, Button, Input, SelectItem, Select, IndexPath } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux'
import { addDevice } from "../../api/Chirpstack";

const checkIcon = (props) => (
    <Icon {...props} name='done-all-outline' />
);

function ChirpstackForm(props) {
    const { control, handleSubmit, errors } = useForm({mode: 'onChange' });
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0))
    const name_reg = /^([a-zA-Z0-9-]*)$/

    const onSubmit = async data => {
        const rexp = new RegExp('-', 'g')
        const pid = props.profiles[selectedIndex.row].id.replace(rexp, "")
        data = {
            ...data,
            deviceProfileID: pid
        }
        const res = await addDevice(data, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGlycHN0YWNrLWFwcGxpY2F0aW9uLXNlcnZlciIsImV4cCI6MTYxNjUwNTExMiwiaXNzIjoiY2hpcnBzdGFjay1hcHBsaWNhdGlvbi1zZXJ2ZXIiLCJuYmYiOjE2MTY0MTg3MTIsInN1YiI6InVzZXIiLCJ1c2VybmFtZSI6Ikd1ZXN0U2FuZGJveCJ9.R0B8_FLla3Mlyeks40Awzx6qYcLVVBwRX-iaYAVmysg")//add token value from redux)

        if (res === 0) {
            alert("The device has correctly been added")
        }
        
        DeviceEventEmitter.emit("event.setScan")
        DeviceEventEmitter.removeAllListeners()
        props.navigation.navigate('Home')
    }

    const setDefault = name => {
        switch (name) {
            case 'name':
                return "device-" + props.device.devEUI.substring(0, 8)
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
                                <Text category="p1">Device name</Text>
                                <Input
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            </>
                        )}
                        rules={{ pattern: name_reg, required: true }}
                        name="name"
                        defaultValue={setDefault('name')}
                    />
                    {errors.name && <Card status='danger'><Text>The name has to contain words, dashes and number ! </Text></Card>}
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
                        name="devEUI"
                        defaultValue={props.device.devEUI}
                    />

                    {<Text category="p1">Profile ID</Text>}
                    {
                        <Select selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} value={props.profiles[selectedIndex.row].name}>
                            {props.profiles.map(elt => <SelectItem key={selectedIndex.row} title={elt.name} />)}
                        </Select>
                    }

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
                        name="appEUI"
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

export default connect(mapStateToProps)(ChirpstackForm)
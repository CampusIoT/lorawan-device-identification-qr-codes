import React from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import { Text, Button, Icon, Card } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";

const checkIcon = (props) => (
    <Icon {...props} name='done-all-outline' />
);

export default function ChirpstackForm() {
    const { control, handleSubmit, errors } = useForm();
    const onSubmit =    (data) => console.log(data);

    return (
        <View style={styles.main_view}>

            <Card style={styles.card} status='primary' disabled={true}>
                <View style={styles.view_form}>
                    <Text category="p1">device name</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="name"
                        defaultValue=""
                    />

                    <Text category="p1">applicationID</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="applicationID"
                        rules={{ required: true }}
                        defaultValue=""
                    />

                    <Text category="p1">description</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="description"
                        defaultValue=""
                    />

                    <Text category="p1">devEUI</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="devEUI"
                        defaultValue=""
                    />

                    <Text category="p1">deviceProfileID</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="deviceProfileID"
                        defaultValue=""
                    />


                    <Text category="p1">AppEUI</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="AppEUI"
                        defaultValue=""
                    />

                </View>
            </Card>

            <Button
                style={styles.button}
                accessoryLeft={checkIcon}
                onPress={handleSubmit(onSubmit)}>
                Submit
            </Button>

        </View >
    );
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
        borderWidth:0.1,
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


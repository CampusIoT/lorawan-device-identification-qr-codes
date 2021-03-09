import React from 'react';
import { StyleSheet, Text, View, } from 'react-native'

class ApplicationItem extends React.Component {
    render() {
        const application = this.props.application
        return (
            <View style={styles.main_container}>
                <View styles={styles.title_container}>
                    <Text>{application.name}</Text>
                </View>
                <View styles={styles.details_container}>
                    <Text>{application.description}</Text>
                    <Text>{application.id}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        heigth: 50,
    },

    title_container: {
        flex: 1
    },

    details_container: {
        flex: 1,
        flexDirection: row,  
        justifyContent: 'space-evenly',
    },

    title: {
        fontSize: 24,
        fontWeight: bold,
    },

})
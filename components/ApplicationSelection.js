import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity, FlatList } from 'react-native'
import { Button } from '@ui-kitten/components'

class ApplicationSelection extends React.Component {
    constructor(props){
        super(props)
        this.applications = _getApplications()
    }

    render(){
        return (
            <SafeAreaView>
                <FlatList/>
            </SafeAreaView>
        )
    }
}

const _getApplications = async() => {
    let applications = await callAPI()
    return(applications)   
}


const styles = StyleSheet.create({

})
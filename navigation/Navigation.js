import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Scanner from '../components/Scanner'
import NodeRegisterPage from '../components/NodeRegisterPage'
import HomePage from '../components/HomePage'

const Stack = createStackNavigator()

export default function MainNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Forms'
                component={NodeRegisterPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Scanner'
                component={Scanner}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

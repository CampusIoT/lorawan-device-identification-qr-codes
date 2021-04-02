import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Scanner from '../components/Scanner'
import NodeRegisterPage from '../components/NodeRegisterPage'
import HomePage from '../components/HomePage'
import NetworkSelection from '../components/NetworkSelection/'
import ApplicationSelection from '../components/ApplicationSelection'
import ChirpstackLogin from '../components/forms/ChirpstackLogin'
import TTNLogin from '../components/forms/TTNLogin'

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
            <Stack.Screen
                name='NetworkSelection'
                component={NetworkSelection}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ApplicationSelection'
                component={ApplicationSelection}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ChirpstackLogin'
                component={ChirpstackLogin}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='TTNLogin'
                component={TTNLogin}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

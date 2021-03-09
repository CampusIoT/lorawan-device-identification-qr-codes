import { createStackNavigator } from '@react-navigation/stack'
import { Scanner } from '../components/Scanner'
import { NodeRegisterPage } from '../components/NodeRegisterPage'
import { HomePage } from '../components/HomePage'

const Stack = createStackNavigator()

function MainNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomePage} />
            <Stack.Screen name='Forms' component={NodeRegisterPage} />
            <Stack.Screen name='Scanner' component={Scanner} />
        </Stack.Navigator>
    )
}
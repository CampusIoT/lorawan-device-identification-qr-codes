/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native'
import { ApplicationProvider, IconRegistry, Button } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigation/Navigation'
import {getProfile} from './api/Chirpstack'

const App = () => {

  const testC = async () => {
    const token = await getProfile("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGlycHN0YWNrLWFwcGxpY2F0aW9uLXNlcnZlciIsImV4cCI6MTYxNTkwNjAzMiwiaXNzIjoiY2hpcnBzdGFjay1hcHBsaWNhdGlvbi1zZXJ2ZXIiLCJuYmYiOjE2MTU4MTk2MzIsInN1YiI6InVzZXIiLCJ1c2VybmFtZSI6Ikd1ZXN0U2FuZGJveCJ9.x15Kx4v5IbmA0YIY7kFzRCiVp1UHA6_4YamPG-CVbIc")
    console.log(token)
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={Store}>
          <NavigationContainer>
            <StatusBar />
            <Button onPress={testC}>
              Test API
            </Button>
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </>
  )
}


const styles = StyleSheet.create({})

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import HomePage from './components/HomePage'
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={Store}>
          <NavigationContainer>
            <StatusBar />
            <HomePage />
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </>
  )
}


const styles = StyleSheet.create({})

export default App;

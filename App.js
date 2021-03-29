import React, { useState } from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { ApplicationProvider, IconRegistry, Button } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
<<<<<<< HEAD
import Navigation  from './navigation/Navigation'

=======
import Navigation from './navigation/Navigation'
>>>>>>> 2c8ce8ee936e6dfe19fc72c5eb2f2e43733e5992

const App = () => {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={Store}>
          <NavigationContainer>
            <StatusBar />
            <Navigation/>
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </>
  )
}


const styles = StyleSheet.create({})

export default App;

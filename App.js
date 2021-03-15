/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { ApplicationProvider, IconRegistry, Button } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import HomePage from './components/HomePage';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import NetworkSelection from './components/NetworkSelection';

const App = () => {

  const testC = async () => {
    const n = await getNumberOfApp('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGlycHN0YWNrLWFwcGxpY2F0aW9uLXNlcnZlciIsImV4cCI6MTYxNTI5NzI0NSwiaXNzIjoiY2hpcnBzdGFjay1hcHBsaWNhdGlvbi1zZXJ2ZXIiLCJuYmYiOjE2MTUyMTA4NDUsInN1YiI6InVzZXIiLCJ1c2VybmFtZSI6Ikd1ZXN0U2FuZGJveCJ9.r7VSE4co79CB2yQy2quK0UfDvEsiHJWui5jjX4W3Vo0')
    alert(n);
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={Store}>
          <StatusBar/>
          <NetworkSelection/>
        </Provider>
      </ApplicationProvider>
    </>
  )
}


const styles = StyleSheet.create({})

export default App;

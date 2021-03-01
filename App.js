/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native'
import { ApplicationProvider, IconRegistry, Button } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { getToken, getNumberOfApp, getAppList } from './api/Chirpstack';

const App = () => {

  const testC = () => {
    getToken('GuestSandbox', 'PWD HERE').then(data => console.log(data.jwt)) // Put the password here to test API
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
          <StatusBar />
          <Button onPress={testC}>
            Test API
          </Button>
        </ApplicationProvider>
    </>
  )
}


const styles = StyleSheet.create({})

export default App;

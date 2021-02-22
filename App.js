/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'

const App = () => {

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar/>
    </ApplicationProvider>
  )
}

const styles = StyleSheet.create({})

export default App;

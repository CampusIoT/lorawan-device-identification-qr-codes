/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import ChirpstackForm from './components/forms/ChirpstackForm';
import NodeRegisterPage from './components/NodeRegisterPage'

const App = () => {

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
          <StatusBar />
          <NodeRegisterPage></NodeRegisterPage>
        </ApplicationProvider>
    </>
  )
}


const styles = StyleSheet.create({})

export default App;

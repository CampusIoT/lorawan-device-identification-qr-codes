/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native'
import NodeRegisterPage from './components/NodeRegisterPage';
const App = () => {
  return (
    <>
      <StatusBar />
      <NodeRegisterPage></NodeRegisterPage>
    </>
  );
};

const styles = StyleSheet.create({})

export default App;

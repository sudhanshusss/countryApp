/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import type { PropsWithChildren } from 'react';
import {
  LogBox
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './StackNavigator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {


  return (
    <StackNavigator />

  );
}


export default App;

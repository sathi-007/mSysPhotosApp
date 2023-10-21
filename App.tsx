/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './components/home';
import Detail from './components/detail';
import { Provider } from 'react-redux'
import { store } from './store';
import { PhotoRealmContext } from './db';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  const {RealmProvider} = PhotoRealmContext

  return (
      <Provider store={store}>
        <NavigationContainer>
          <RealmProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </RealmProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

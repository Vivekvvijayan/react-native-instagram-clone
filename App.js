import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './app/components/RootNavigator';
import { store } from './app/store';
import { Provider } from 'react-redux'


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

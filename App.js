import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AddTaskComponent from './components/addTask';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeeTasks from './components/SeeAllTask'

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SeeTasks">
            <Stack.Screen name="SeeTasks" component={SeeTasks} options={{ title: 'ראה משימות' }} />
            <Stack.Screen name="AddTask" component={AddTaskComponent} options={{ title: 'הוסף משימה' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

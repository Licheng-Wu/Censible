import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpensePage from '../AddExpensePage';
import { Button } from 'native-base/src/basic/Button';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('AddExpenses')}><Text>Add Expense</Text></Button>
    </View>
  );
}

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddExpenses" component={AddExpensePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
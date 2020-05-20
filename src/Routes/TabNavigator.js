import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'native-base/src/basic/Button';
import AddExpensePage from '../AddExpensePage';

function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
          <MonthlyExpense style = {styles.expense}/>
          <Button style = {styles.button}
            onPress={() => navigation.navigate('AddExpenses')}>
              <Text>Add Expense</Text>
          </Button>
      </View>
    );
}

const MonthlyExpense = () => {
  return (
    <View style = {styles.innerContainer}>
      <View style = {styles.box}>
          <Text style = {styles.text}> Income </Text>
          <Text style = {styles.number}> 0 </Text>
      </View>

      <View style = {styles.box}>
          <Text style = {styles.text}> Expenses </Text>
          <Text style = {styles.number}> 0 </Text>
      </View>

      <View style = {styles.box}>
          <Text style = {styles.text}> Balance </Text>
          <Text style = {styles.number}> 0 </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  expense: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
},
  box: {
      flex: 1,
      backgroundColor: 'white',
      borderColor: 'grey',
      height: 80
  },
  text: {
      color: 'black',
      fontSize: 25,
      textAlign: 'center',
  },
  number: {
      color: 'black',
      fontSize: 35,
      textAlign: 'center'
  },
  button: {
    marginBottom: 10
  }
})
function DetailsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
        <Tab.Screen name="AddExpenses" component={AddExpensePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
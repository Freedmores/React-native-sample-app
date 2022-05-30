import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Favorites from './screens/Favorites';
import Recipes from './screens/Recipes';
import Convert from './screens/Convert';
import Membership from './screens/Membership';
import AddRecipe from './screens/AddRecipe';
import RecipeDetail from './screens/RecipeDetail';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
const MyStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen
          name="MyNav"
          component={MyNav}
          options={{headerShown: false}}
        />
        <MyStack.Screen name="Recipes" component={Recipes} />
        <MyStack.Screen name="Favorites" component={Favorites} />
        <MyStack.Screen name="Convert" component={Convert} />
        <MyStack.Screen name="Membership" component={Membership} />
        <MyStack.Screen name="AddRecipe" component={AddRecipe} />
        <MyStack.Screen name="RecipeDetail" component={RecipeDetail} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
}

function MyNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            size = focused ? 20 : 15;
            // color = focused ? '#f0f' : '#555';
          } else if (route.name === 'Recipes') {
            iconName = 'list';
            size = focused ? 20 : 15;
            // color = focused ? '#f0f' : '#555';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
            size = focused ? 20 : 15;
            // color = focused ? '#f0f' : '#555';
          } else if (route.name === 'Membership') {
            iconName = 'user';
            size = focused ? 20 : 15;
            // color = focused ? '#f0f' : '#555';
          } else if (route.name === 'Convert') {
            iconName = 'balance-scale';
            size = focused ? 20 : 15;
            // color = focused ? '#f0f' : '#555';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#f0f',
        inactiveTintColor: '#555',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#999',
        showLabel: true,
        labelStyle: {fontSize: 14},
        showIcon: true,
      }}
      activeColor="#f0edf6"
      inactiveColor="#999"
      barStyle={{backgroundColor: '#6A1B9A'}}>
      <Tab.Screen name="Home" component={Home} options={{}} />
      <Tab.Screen name="Recipes" component={Recipes} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Membership" component={Membership} />
      <Tab.Screen name="Convert" component={Convert} />
    </Tab.Navigator>
  );
}

import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TokenContext } from '../Contexte/Context';
import SignInScreen from '../Screen/SignInScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import HomeScreen from '../Screen/HomeScreen';
import SignOutScreen from '../Screen/SignOutScreen';
import NavigationTodo from './NavigationTodo';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [token] = useContext(TokenContext);

  return (
    <NavigationContainer>
      {token == null ? (
        <Tab.Navigator>
          <Tab.Screen name="SignIn" component={SignInScreen} />
          <Tab.Screen name="SignUp" component={SignUpScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="SignOut" component={SignOutScreen} />
          <Tab.Screen name="TodoList" component={NavigationTodo} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

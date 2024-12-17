import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../Screen/TodoListScreen';
import TodoItemScreen from '../Screen/TodoItemScreen';

const Stack = createNativeStackNavigator();

export default function NavigationTodo() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={TodoListScreen} options={{ title: 'Mes Listes' }} />
      <Stack.Screen name="Details" component={TodoItemScreen} options={{ title: 'Détails' }} />
    </Stack.Navigator>
  );
}

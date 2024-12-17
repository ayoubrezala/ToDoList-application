import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Todolists from '../components/Todolists';

export default function TodoListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Mes Tâches</Text>
      <Todolists navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});


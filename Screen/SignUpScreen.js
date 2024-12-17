import React, { useContext, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
  ImageBackground,
} from 'react-native';
import { TokenContext, UsernameContext } from '../Contexte/Context';
import { signUp } from '../components/sign';

const backgroundImage = require('../assets/1489353.jpg'); //on spécifie le chemin vers l'image de fond

export default function SignUp({ navigation }) {
  const [, setToken] = useContext(TokenContext);
  const [, setUsernameContext] = useContext(UsernameContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = () => {
    setLoading(true);
    setError(null);

    signUp(usernameInput, passwordInput)
      .then((token) => {
        setLoading(false);
        setToken(token);
        setUsernameContext(usernameInput);
        navigation.navigate('Home');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Créer un compte</Text>
        <TextInput
          placeholder="Nom d'utilisateur"
          value={usernameInput}
          onChangeText={setUsernameInput}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={passwordInput}
          onChangeText={setPasswordInput}
          secureTextEntry={true}
          style={styles.input}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="S'inscrire" onPress={signup} />
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 39, 46, 0.8)', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 0,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  errorText: {
    color: '#ff6b6b', 
    marginTop: 15,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});


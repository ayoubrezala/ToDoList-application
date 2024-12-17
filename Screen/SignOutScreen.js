import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { TokenContext, UsernameContext } from '../Contexte/Context';

const backgroundImage = require('../assets/1489353.jpg'); //on spécifie le chemin vers l'image

export default function SignOutScreen() {
  const [, setToken] = useContext(TokenContext);
  const [, setUsername] = useContext(UsernameContext);

  const signOut = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.box}>
            <Text style={styles.bigText}>vous  n'avez  pas  encore  fini  votre  travail!</Text>
            <Text style={styles.smallText}>voulez-vous vraiment déconnecter ?</Text>
          </View>
        </View>
        <Button title="Sign Out" onPress={signOut} />
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
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  bigText: {
    color: '#333', 
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  smallText: {
    color: '#111', 
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold', 
  },
});


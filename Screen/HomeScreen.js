import React, { useContext } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { TokenContext, UsernameContext } from '../Contexte/Context';

const backgroundImage = require('../assets/1489353.jpg'); // on spécifie le chemin vers l'image

export default function HomeScreen({ navigation }) {
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.box}>
          {token ? (
            <>
              <Text style={styles.welcomeText}>
                 Bienvenue, <Text style={styles.username}>{username}</Text>! 
              </Text>
              <Text style={styles.infoText}>
                J'espère que vous finirez bientôt votre travail !
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.errorText}> Vous n'êtes pas connecté.</Text>
              <Text style={styles.infoText}>
                J'espère que vous finirez bientôt votre travail !
              </Text>
            </>
          )}
        </View>
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
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', 
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333', 
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  username: {
    color: '#000', // Texte noir
    fontWeight: '900',
    textTransform: 'capitalize',
  },
  errorText: {
    fontSize: 20,
    color: '#e74c3c',
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#333', 
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});


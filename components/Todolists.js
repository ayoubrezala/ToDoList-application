import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import { getTodoLists, createTodoList, deleteTodoList, updateTodoList } from '../components/todoList';
import { TokenContext, UsernameContext } from '../Contexte/Context';

const backgroundImage = require('../assets/1489353.jpg'); // on spécifie le chemin vers l'image de fond

export default function Todolists({ navigation }) {
  const [todoLists, setTodoLists] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState('');
  const [username] = useContext(UsernameContext);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    const fetchTodoLists = async () => {
      setLoading(true);
      try {
        const lists = await getTodoLists(username, token);
        setTodoLists(lists);
      } catch (error) {
        Alert.alert('Erreur', "Impossible de charger les listes de tâches.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodoLists();
  }, [username, token]);

  const handleAddTodoList = async () => {
    if (!newTodoTitle.trim()) {
      Alert.alert('Erreur', "Le titre de la liste ne peut pas être vide.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newTodo = await createTodoList(username, newTodoTitle, token);
      setTodoLists((prevLists) => [...prevLists, newTodo]);
      setNewTodoTitle('');
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'ajouter la liste.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTodoList = async (id) => {
    try {
      await deleteTodoList(id, token);
      setTodoLists((prevLists) => prevLists.filter((list) => list.id !== id));
    } catch (error) {
      Alert.alert('Erreur', "Impossible de supprimer la liste.");
    }
  };

  const handleEditTodoList = async () => {
    if (!editTodoTitle.trim()) {
      Alert.alert('Erreur', "Le titre de la liste ne peut pas être vide.");
      return;
    }

    try {
      const updatedTodo = await updateTodoList(editTodoId, editTodoTitle, token);
      setTodoLists((prevLists) =>
        prevLists.map((list) =>
          list.id === editTodoId ? { ...list, title: updatedTodo.title } : list
        )
      );
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erreur', "Impossible de modifier la liste.");
    }
  };

  if (loading) {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={todoLists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <TouchableOpacity
                style={styles.todoContent}
                onPress={() =>
                  navigation.navigate('Details', {
                    todoListId: item.id,
                    todoListTitle: item.title,
                  })
                }
              >
                <Text style={styles.todoTitle}>{item.title}</Text>
              </TouchableOpacity>
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    setEditTodoId(item.id);
                    setEditTodoTitle(item.title);
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={require('../assets/update.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTodoList(item.id)}>
                  <Image
                    source={require('../assets/delete.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noDataText}>Aucune liste trouvée.</Text>}
        />
        <View style={styles.addTodoContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ajouter une nouvelle liste"
            value={newTodoTitle}
            onChangeText={setNewTodoTitle}
          />
          <Button title="Ajouter" onPress={handleAddTodoList} disabled={isSubmitting} />
        </View>
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier la liste</Text>
              <TextInput
                style={styles.input}
                value={editTodoTitle}
                onChangeText={setEditTodoTitle}
                placeholder="Nouveau titre"
              />
              <Button title="Valider" onPress={handleEditTodoList} />
              <Button title="Annuler" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
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
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparence sur l'image
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  buttons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
  input: {
    height: 40,
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    marginBottom: 10,
  },
  addTodoContainer: {
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    color: '#ecf0f1',
    fontSize: 16,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#ecf0f1',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


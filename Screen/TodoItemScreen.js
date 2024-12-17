import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Switch,
  ImageBackground,
  Image,
} from 'react-native';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../components/todo';
import { TokenContext } from '../Contexte/Context';

const backgroundImage = require('../assets/1489353.jpg'); // on spécifie le chemin vers l'image
const deleteIcon = require('../assets/delete.png'); //on spécifie le chemin vers l'icône de suppression

export default function TodoItemScreen({ route }) {
  const { todoListId, todoListTitle } = route.params;
  const [todos, setTodos] = useState([]);
  const [newTodoContent, setNewTodoContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const fetchedTodos = await getTodos(todoListId, token);
        setTodos(fetchedTodos);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de charger les tâches.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [todoListId, token]);

  const handleAddTodo = async () => {
    if (!newTodoContent.trim()) {
      Alert.alert('Erreur', 'Le contenu de la tâche ne peut pas être vide.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newTodo = await createTodo(newTodoContent, todoListId, token);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoContent('');
    } catch {
      Alert.alert('Erreur', "Une erreur s'est produite lors de l'ajout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTodo = async (id, done) => {
    try {
      const updatedTodo = await updateTodo(id, !done, token);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done: updatedTodo.done } : todo
        )
      );
    } catch {
      Alert.alert('Erreur', "Une erreur s'est produite lors de la mise à jour.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id, token);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch {
      Alert.alert('Erreur', "Une erreur s'est produite lors de la suppression.");
    }
  };

  const calculateProgress = () => {
    if (todos.length === 0) return 0;
    const completedTodos = todos.filter((todo) => todo.done).length;
    return completedTodos / todos.length;
  };

  const progress = calculateProgress();

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
        <Text style={styles.title}>Tâches pour "{todoListTitle}"</Text>

        {/* Barre de progression */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progress * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {todos.filter((todo) => todo.done).length}/{todos.length} tâches réalisées
          </Text>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <View style={styles.todoContent}>
                <Text style={[styles.todoText, item.done && styles.todoDone]}>
                  {item.content}
                </Text>
                <Switch
                  value={item.done}
                  onValueChange={() => handleToggleTodo(item.id, item.done)}
                />
              </View>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item.id)}
                style={styles.deleteButton}
              >
                <Image source={deleteIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noDataText}>Aucune tâche trouvée.</Text>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nouvelle tâche"
            value={newTodoContent}
            onChangeText={setNewTodoContent}
          />
          <Button
            title={isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
            onPress={handleAddTodo}
            disabled={isSubmitting}
          />
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
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#555',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  progressText: {
    color: '#ffffff',
    marginTop: 5,
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  todoDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


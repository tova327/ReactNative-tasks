import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Pressable ,Button} from 'react-native';

const SeeTasks = ({ navigation }) => {
    const fetchTasks = async () => {
        setLoading(true)
        try {
          const response = await fetch('http://eventsapi.onrender.com/api/Events');
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          Alert.alert('שגיאה', 'לא הצלחנו לטעון את המשימות');
        } finally {
          setLoading(false);
        }
      };
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>{item.start}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

        <Button onPress={fetchTasks} title='רענן'>  </Button>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Pressable style={styles.button} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.buttonText}>הוסף משימה</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
  },
  taskTitle: {
    fontSize: 20,
  },
  taskDate: {
    fontSize: 16,
  },
  button: {
    //backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    color:'#007bff'
  },
});

export default SeeTasks;

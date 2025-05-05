import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  StyleSheet, 
  KeyboardAvoidingView, 
  ImageBackground 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskComponent = () => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title) {
      Alert.alert('שגיאה', 'יש למלא את כותרת המשימה');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://eventsapi.onrender.com/api/Events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, start: start.toISOString().split('T')[0] }),
      });

      if (response.ok) {
        Alert.alert('הצלחה', 'המשימה נוספה בהצלחה');
        setTitle('');
        setStart(new Date());
      } else {
        Alert.alert('שגיאה', 'לא הצלחנו להוסיף את המשימה');
      }
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || start;
    setShow(false);
    setStart(currentDate);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground source={require('../task.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>הוסף משימה</Text>
          <TextInput 
            style={styles.input} 
            placeholder="כותרת" 
            value={title} 
            onChangeText={setTitle} 
          />
          <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
            <Text style={styles.dateText}>{start.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={start}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleAddTask} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'שולח...' : 'הוסף משימה'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:400
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity:10
  },
  scrollView: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dateText: {
    color: 'black',
    textAlign: 'center',
    lineHeight: 40,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddTaskComponent;

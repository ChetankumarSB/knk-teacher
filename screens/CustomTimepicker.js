import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const CustomTimePicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isAM, setIsAM] = useState(true);

  const handleHoursIncrement = () => {
    setHours((prevHours) => (prevHours + 1) % 12);
  };

  const handleHoursDecrement = () => {
    setHours((prevHours) => (prevHours - 1 + 12) % 12);
  };

  const handleMinutesIncrement = () => {
    setMinutes((prevMinutes) => (prevMinutes + 1) % 60);
  };

  const handleMinutesDecrement = () => {
    setMinutes((prevMinutes) => (prevMinutes - 1 + 60) % 60);
  };

  const handleToggleAMPM = () => {
    setIsAM((prevIsAM) => !prevIsAM);
  };

  return (
    
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={handleToggleAMPM}>
        <Text style={styles.toggleButtonText}>{isAM ? 'From' : 'to'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHoursDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.timeText}>{hours.toString().padStart(2, '0')}</Text>
      <TouchableOpacity style={styles.button} onPress={handleHoursIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleMinutesDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.timeText}>{minutes.toString().padStart(2, '0')}</Text>
      <TouchableOpacity style={styles.button} onPress={handleMinutesIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toggleButton} onPress={handleToggleAMPM}>
        <Text style={styles.toggleButtonText}>{isAM ? 'AM' : 'PM'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 5,
    padding: 3,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#555555',
  },
  timeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginLeft: 5,
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 7,
    backgroundColor: '#DDDDDD',
  },
  toggleButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555555',
  },
});

export default CustomTimePicker;

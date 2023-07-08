import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTimePicker from './CustomTimepicker'; // Import the CustomTimePicker component

const Timetable = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [className, setClassName] = useState('');

  const navigation = useNavigation();

  const handleNextPage = () => {
    navigation.navigate('NextPage');
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tableRow}>
          <Text style={styles.weekHeader}>   SUN</Text>
          <Text style={styles.weekHeader}>   MON</Text>
          <Text style={styles.weekHeader}>    TUE</Text>
          <Text style={styles.weekHeader}>   WED</Text>
          <Text style={styles.weekHeader}>   THU</Text>
          <Text style={styles.weekHeader}>    FRI</Text>
          <Text style={styles.weekHeader}>    SAT</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}> Time </Text>
          <Text style={styles.tableHeader}> Monday </Text>
        </View>

        <View style={styles.tablecolumn}>
          <View style={styles.tablecolumn}>
            <CustomTimePicker value={time1} onChange={(time) => setTime1(time)} />
          </View>
          <View style={styles.tablecolumn}>
            <CustomTimePicker value={time2} onChange={(time) => setTime2(time)} />
          </View>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}> Class </Text>
        </View>

        <View style={styles.tableRow}>
          <TextInput
            style={styles.input}
            value={className}
            onChangeText={(text) => setClassName(text)}
            placeholder="Enter class name"
          />
        </View>

        {/* Repeat the above pattern for other rows */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 5,
  },
  tablecolumn: {
    flex: 0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 5,
  },
  weekHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 6,
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#DDDDDD',
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
});

export default Timetable;

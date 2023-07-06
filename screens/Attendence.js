import React, {useState} from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { DataTable,Text } from 'react-native-paper';

const Attendance = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const studentNames = [
        'John Doe',
        'Jane Smith',
        'Michael Johnson',
        'Emily Davis',
        'David Brown'
      ];
    

    const toggleSwitch = () => {


        setIsEnabled(previousState => !previousState)

    }
  
return (
<>

<View style={styles.container}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}> Student Name</Text>
        <Text style={styles.tableHeader}> Attendance</Text>
      </View>

      {studentNames.map((name, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.tableCell}>{name}</Text>
          <Text style={styles.tableCell}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </Text>
        </View>
      ))}
    </View>
      
</>
);
};

export default Attendance;

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
    paddingVertical: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
  },
});

import React, {useState} from 'react';
import { StyleSheet, Switch, View,TextInput } from 'react-native';
import { DataTable,Text, } from 'react-native-paper';

const Timetable = () => {
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



      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <TextInput
  style={styles.tableCell}
  value=""
  onChangeText={text => console.log(text)} // Add your desired onChangeText behavior
/>
      </View>


      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 2  </Text>
      </View>

      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 3  </Text>
      </View>

      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 4  </Text>
      </View>

      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 5  </Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}> Time </Text>
        <Text style={styles.tableHeader}> Monday </Text>
      </View>


      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 1  </Text>
      </View>


      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 2  </Text>
      </View>

      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 3  </Text>
      </View>

      <View style={styles.tableRow}>
      <Text style={styles.tableCell}>9:00 AM - 10:00 AM </Text>
      <Text style={styles.tableCell}>  Event 4  </Text>
      </View>


        </View>

</>
);
};

export default Timetable;

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
  weekHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 5,
    borderRadius: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
  },
});

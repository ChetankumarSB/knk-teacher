import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Card, Snackbar } from 'react-native-paper';
import axios from 'axios';

const data = [
  { label: 'Class 5', value: 'Class 5' },
  { label: 'Class 6', value: 'Class 6' },
  { label: 'Class 7', value: 'Class 7' },
  { label: 'Class 8', value: 'Class 8' },
  { label: 'Class 9', value: 'Class 9' },
  { label: 'Class 10', value: 'Class 10' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [studentNames, setStudentNames] = useState([]);
  const [switchStates, setSwitchStates] = useState({});
  const [isAttendanceUpdated, setIsAttendanceUpdated] = useState(false);
  const [isClassSelected, setIsClassSelected] = useState(false);
  const [selectedAbsentees, setSelectedAbsentees] = useState([]);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  useEffect(() => {
    // Set all switches to "on" initially
    const initialSwitchStates = {};
    studentNames.forEach((name) => {
      initialSwitchStates[name] = true;
    });
    setSwitchStates(initialSwitchStates);
  }, [studentNames]);

  // Function to toggle the switch state
  const toggleSwitch = (name) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [name]: !prevStates[name],
    }));
  };

  // Function to select the class and fetch student data
  const selectClass = () => {
    console.log(value);

    axios
      .get('http://172.20.10.9:8001/teacher/classdata/classnumber/read', {
        params: {
          classNumber: value,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        setStudentNames(response.data);
        setIsClassSelected(true); // Mark class as selected
        setIsAttendanceUpdated(false); // Reset attendance update status
        setSelectedAbsentees([]); // Clear selected absentees
        console.log('Data received from MongoDB successfully');
      })
      .catch((error) => {
        console.error('Error receiving data from MongoDB:', error);
      });
  };

  // Function to handle the "Update Attendance" button click
  const handleButtonClick = () => {
    const switchOffNames = Object.keys(switchStates).filter((name) => !switchStates[name]);
    setSelectedAbsentees(switchOffNames); // Set the selected absentees to display in the card
    setIsAttendanceUpdated(true); // Mark attendance as updated
  };

  // Function to handle back button click on the card
  const handleBackClick = () => {
    setIsAttendanceUpdated(false);
    setSelectedAbsentees([]); // Clear selected absentees
  };

  // Function to handle submit button click on the card
  const handleSubmitClick = () => {
    // Send data to the server
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in ISO format "YYYY-MM-DD"

    // Convert the date to "DD-MM-YYYY" format
    const [year, month, day] = currentDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    console.log('Absent Names:', selectedAbsentees);

    axios
      .post('http://172.20.10.9:8001/teacher/attendanceupdate/post', {
        date: formattedDate, // Use the formatted date
        absentNames: selectedAbsentees,
        class: value, // Set the "class" field with the selected class value
      })
      .then((response) => {
        console.log('Data sent to server successfully:', response.data);

        // Show Snackbar on successful submission
        setIsSnackbarVisible(true);

        // Reset the component state after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          setIsSnackbarVisible(false);
          resetState();
        }, 2000);
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
      });
  };

  // Function to reset the state
  const resetState = () => {
    setValue(null);
    setStudentNames([]);
    setSwitchStates({});
    setIsAttendanceUpdated(false);
    setIsClassSelected(false);
    setSelectedAbsentees([]);
  };

  // Render the card with the selected absentees
  const renderAbsenteesCard = () => {
    return (
      <Card style={styles.card}>
        <Card.Title title="Selected Absentees" />
        <Card.Content>
          {selectedAbsentees.map((name, index) => (
            <Text key={index}>{name}</Text>
          ))}
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity onPress={handleBackClick}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          <Button mode="contained" color="#0000FF" onPress={handleSubmitClick}>
            Submit Attendance
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  // Function to render each item in the dropdown
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Class"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
            renderItem={renderItem}
          />

          {isClassSelected ? (
            // Display the card with selected absentees if attendance is updated
            isAttendanceUpdated ? (
              renderAbsenteesCard()
            ) : (
              // Otherwise display the table with switches
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
                        thumbColor={switchStates[name] ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitch(name)}
                        value={switchStates[name]}
                      />
                    </Text>
                  </View>
                ))}

                <Button mode="contained" color="#0000FF" onPress={handleButtonClick}>
                   attendance
                </Button>
              </View>
            )
          ) : (
            <Button mode="contained" color="#FF0000" onPress={selectClass}>
              Submit
            </Button>
          )}

          <Snackbar visible={isSnackbarVisible} onDismiss={() => setIsSnackbarVisible(false)}>
            Attendance updated successfully!
          </Snackbar>
        </View>
      </ScrollView>
    </>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  card: {
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  backButton: {
    marginRight: 10,
    color: 'blue',
  },
});

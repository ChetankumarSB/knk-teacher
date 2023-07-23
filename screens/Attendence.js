import React, { useState, useEffect } from 'react';
import { View, Text, Modal, FlatList, Switch, TouchableOpacity } from 'react-native';
import { Button, Card, ListItem } from 'react-native-elements';
import axios from 'axios';

const YourComponent = () => {
  const classdata = [
    { label: 'Class 1', CLASS_NUMBER: 'Class 1' },
    { label: 'Class 2', CLASS_NUMBER: 'Class 2' },
    { label: 'Class 3', CLASS_NUMBER: 'Class 3' },
    { label: 'Class 4', CLASS_NUMBER: 'Class 4' },
  ];

  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [absentStudents, setAbsentStudents] = useState([]);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    try {
      const response = await axios.get('http://172.20.10.9:8001/teacher/classdata/read');
      setClassData(response.data);
      setStatusData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (CLASS_NUMBER, ADMISSION_NUMBER, Student_Name, present) => {
    const updatedData = classData.map((data) => {
      if (data.CLASS_NUMBER === CLASS_NUMBER && data.ADMISSION_NUMBER === ADMISSION_NUMBER) {
        return { ...data, present };
      }
      return data;
    });
    setStatusData(updatedData);
  };

  const handleTogglePress = (CLASS_NUMBER, ADMISSION_NUMBER, Student_Name) => {
    handleToggle(CLASS_NUMBER, ADMISSION_NUMBER, Student_Name, true);
  };

  const handleToggleLongPress = (CLASS_NUMBER, ADMISSION_NUMBER) => {
    handleToggle(CLASS_NUMBER, ADMISSION_NUMBER, false);
  };
vs

  const handleClassSelect = (CLASS_NUMBER) => {
    setSelectedClass(CLASS_NUMBER);
    setModalVisible(false);
  };

  const handleSubmission = async () => {
    const selectedStudentData = classData.find((data) => data.CLASS_NUMBER === selectedClass);
    setSelectedStudent(selectedStudentData);
    setAbsentStudents(
      statusData.filter((data) => data.CLASS_NUMBER === selectedClass && !data.present)
    );

    // Send attendance data to the server
    try {
      await axios.post('http://172.20.10.9:8001/teacher/attendance/update', {
        date: new Date().toISOString(),
        class: selectedClass,
        attendance: statusData.filter((data) => data.CLASS_NUMBER === selectedClass),
      });
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const renderDropdownItem = ({ item }) => (
    <ListItem
      key={item.CLASS_NUMBER}
      title={item.label}
      onPress={() => handleClassSelect(item.CLASS_NUMBER)}
      bottomDivider
      chevron
    />
  );

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title={selectedClass ? selectedClass : 'Select Class'}
        onPress={() => setModalVisible(true)}
        containerStyle={{ marginVertical: 10 }}
      />

      <Button
        title="Submit"
        onPress={handleSubmission}
        disabled={!selectedClass}
        buttonStyle={{ backgroundColor: '#007AFF' }}
        containerStyle={{ marginBottom: 10 }}
      />

      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <FlatList
          data={classdata}
          renderItem={renderDropdownItem}
          keyExtractor={(item) => item.CLASS_NUMBER}
        />
      </Modal>

      {selectedStudent && (
        <Card containerStyle={{ marginVertical: 10 }}>
          <Card.Title>Selected Class: {selectedClass}</Card.Title>
          <Card.Divider />
          <Text>ADMISSION_NUMBER: {selectedStudent.ADMISSION_NUMBER}</Text>
          <Text>Student_Name: {selectedStudent.Student_Name}</Text>
          <TouchableOpacity
            onPress={() =>
              handleTogglePress(
                selectedStudent.CLASS_NUMBER,
                selectedStudent.ADMISSION_NUMBER,
                selectedStudent.Student_Name
              )
            }
            onLongPress={() =>
              handleToggleLongPress(selectedStudent.CLASS_NUMBER, selectedStudent.ADMISSION_NUMBER)
            }
          >
            <Text>Toggle</Text>
          </TouchableOpacity>
        </Card>
      )}

      <FlatList
        data={statusData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card containerStyle={{ marginVertical: 5 }}>
            <Card.Title>{item.ADMISSION_NUMBER}</Card.Title>
            <Card.Divider />
            <Text>{item.Student_Name}</Text>
            <TouchableOpacity
              onPress={() =>
                handleTogglePress(item.CLASS_NUMBER, item.ADMISSION_NUMBER, item.Student_Name)
              }
              onLongPress={() => handleToggleLongPress(item.CLASS_NUMBER, item.ADMISSION_NUMBER)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={item.present}
                />
                <Text>{item.present ? 'Present' : 'Absent'}</Text>
              </View>
            </TouchableOpacity>
          </Card>
        )}
      />

      {absentStudents.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text>Absent Students:</Text>
          {absentStudents.map((student) => (
            <Text key={student.ADMISSION_NUMBER}>{student.Student_Name}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default YourComponent;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import axios from 'axios';

const DropdownComponent = () => {
  const [subject, setSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [fromtime, setFromTime] = useState(null);
  const [totime, setToTime] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await axios.get('http://172.20.10.9:8001/teacher/timetable/post');
      setTimetableData(response.data);
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const submitTimetable = async () => {
    const timetableData = {
      subject,
      classname: selectedClass,
      week: selectedWeek,
      fromtime,
      totime,
    };

    try {
      const response = await axios.post('http://172.20.10.9:8001/teacher/timetable/post', timetableData);
      console.log('Timetable updated');
    } catch (error) {
      console.error(error);
    }
    console.log(timetableData);
  };

  const handleClassChange = item => {
    setSelectedClass(item.classname);
    setSelectedWeek(null);
  };

  const handleWeekChange = item => {
    setSelectedWeek(item.week);
  };

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={classdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="classname"
          placeholder="Select class"
          searchPlaceholder="Search..."
          value={selectedClass}
          onChange={handleClassChange}
          renderItem={renderItem}
        />

        {selectedClass && (
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={weekdata}
            search
            maxHeight={300}
            labelField="label"
            valueField="week"
            placeholder="Select weekday"
            searchPlaceholder="Search..."
            value={selectedWeek}
            onChange={handleWeekChange}
            renderItem={renderItem}
          />
        )}
      </View>
    );
  };

  const renderCard = () => {
    if (!isDataLoaded) {
      return null;
    }

    const filteredData = timetableData.filter(item => item.classname === selectedClass && item.week === selectedWeek);

    return (
      <View style={styles.cardContainer}>
        {filteredData.map((item, index) => (
          <View key={index.toString()} style={styles.card}>
            <Text style={styles.cardText}>{item.subject}</Text>
            <Text style={styles.cardText}>
              {item.fromtime} - {item.totime}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={classdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="classname"
          placeholder="Select class"
          searchPlaceholder="Search..."
          value={selectedClass}
          onChange={handleClassChange}
          renderItem={renderItem}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={subjectdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="subject"
          placeholder="Select subject"
          searchPlaceholder="Search..."
          value={subject}
          onChange={item => setSubject(item.subject)}
          renderItem={renderItem}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={weekdata}
          search
          maxHeight={300}
          labelField="label"
          valueField="week"
          placeholder="Select weekday"
          searchPlaceholder="Search..."
          value={selectedWeek}
          onChange={handleWeekChange}
          renderItem={renderItem}
        />

        <View style={styles.timeContainer}>
          <Dropdown
            style={styles.timeDropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={timedata}
            search
            maxHeight={300}
            labelField="label"
            valueField="time"
            placeholder="From"
            searchPlaceholder="Search..."
            value={fromtime}
            onChange={item => setFromTime(item.time)}
            renderItem={renderItem}
          />

          <Dropdown
            style={styles.timeDropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={timedata}
            search
            maxHeight={300}
            labelField="label"
            valueField="time"
            placeholder="Till"
            searchPlaceholder="Search..."
            value={totime}
            onChange={item => setToTime(item.time)}
            renderItem={renderItem}
          />
        </View>
        <Button mode="contained" color="#FF0000" onPress={submitTimetable}>
          Submit
        </Button>
      </View>

      {renderHeader()}
      {renderCard()}
    </View>
  );
};

const classdata = [
  { label: 'Class 1', classname: 'Class 1' },
  { label: 'Class 2', classname: 'Class 2' },
  { label: 'Class 3', classname: 'Class 3' },
  { label: 'Class 4', classname: 'Class 4' },
  { label: 'Class 5', classname: 'Class 5' },
  { label: 'Class 6', classname: 'Class 6' },
];

const subjectdata = [
  { label: 'Kannada', subject: 'Kannada' },
  { label: 'English', subject: 'English' },
  { label: 'Hindi', subject: 'Hindi' },
  { label: 'Science', subject: 'Science' },
  { label: 'Social science', subject: 'Social science' },
  { label: 'Mathematics', subject: 'Mathematics' },
  { label: 'Sports', subject: 'Sports' },
  { label: 'Drawing', subject: 'Drawing' },
];

const weekdata = [
  { label: 'Sunday', week: 'Sunday' },
  { label: 'Monday', week: 'Monday' },
  { label: 'Tuesday', week: 'Tuesday' },
  { label: 'Wednesday', week: 'Wednesday' },
  { label: 'Thursday', week: 'Thursday' },
  { label: 'Friday', week: 'Friday' },
  { label: 'Saturday', week: 'Saturday' },
];

const timedata = [
  { label: '1 AM', time: '1 AM' },
  { label: '2 AM', time: '2 AM' },
  { label: '3 AM', time: '3 AM' },
  { label: '4 AM', time: '4 AM' },
  { label: '5 AM', time: '5 AM' },
  { label: '6 AM', time: '6 AM' },
  { label: '7 AM', time: '7 AM' },
  { label: '8 AM', time: '8 AM' },
  { label: '9 AM', time: '9 AM' },
  { label: '10 AM', time: '10 AM' },
  { label: '11 AM', time: '11 AM' },
  { label: '12 PM', time: '12 PM' },
  { label: '1 PM', time: '1 PM' },
  { label: '2 PM', time: '2 PM' },
  { label: '3 PM', time: '3 PM' },
  { label: '4 PM', time: '4 PM' },
  { label: '5 PM', time: '5 PM' },
  { label: '6 PM', time: '6 PM' },
  { label: '7 PM', time: '7 PM' },
  { label: '8 PM', time: '8 PM' },
  { label: '9 PM', time: '9 PM' },
  { label: '10 PM', time: '10 PM' },
  { label: '11 PM', time: '11 PM' },
  { label: '12 AM', time: '12 AM' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
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
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
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
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeDropdown: {
    flex: 1,
    marginLeft: 8,
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
  cardContainer: {
    marginTop: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default DropdownComponent;

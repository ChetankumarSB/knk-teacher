import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const DropdownComponent = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await axios.get('http://172.20.10.9:8001/teacher/timetable/read');
      setTimetableData(response.data);
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
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
            single={true} // Set single selection
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

    const filteredData = timetableData.filter(
      item => item.classname === selectedClass && item.week === selectedWeek
    );

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
          single={true} // Set single selection
          renderItem={renderItem}
        />
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

const weekdata = [
  { label: 'Sunday', week: 'Sunday' },
  { label: 'Monday', week: 'Monday' },
  { label: 'Tuesday', week: 'Tuesday' },
  { label: 'Wednesday', week: 'Wednesday' },
  { label: 'Thursday', week: 'Thursday' },
  { label: 'Friday', week: 'Friday' },
  { label: 'Saturday', week: 'Saturday' },
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

import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import XLSX from 'xlsx';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';

const classdata = [
  { label: 'Class 5', classname: 'Class 5' },
  { label: 'Class 6', classname: 'Class 6' },
  { label: 'Class 7', classname: 'Class 7' },
  { label: 'Class 8', classname: 'Class 8' },
  { label: 'Class 10', classname: 'Class 9' },
  { label: 'Class 10', classname: 'Class 10' },
];

const YourComponent = () => {
  const [classname, setClass] = useState("Class 1");
  const [jsonData, setJsonData] = useState(null);

  const ClassDataSelect = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });

      const fileUri = res[0].uri;
 
      const fileContent = await RNFS.readFile(fileUri, 'base64');
      const workbook = XLSX.read(fileContent, { type: 'base64' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      const jsonData = JSON.stringify(data.map(item => ({
        CLASS_NUMBER: classname,
        ADMISSION_NUMBER: item[0],
        Student_Name: item[1],
        Father_Name: item[2],
        Mother_name: item[3],
        Date_of_Birth: item[4],
        Mobile_No: item[5],
        Email_id: item[6]
      })));

      const parsedData = JSON.parse(jsonData);
      const totalAdmissionNumbers = parsedData.length;
      
      console.log(totalAdmissionNumbers - 1);

      axios.post('http://172.20.10.9:8001/teacher/attendanceupdate/read', parsedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Data sent to MongoDB successfully');
      })
      .catch(error => {
        console.error('Error sending data to MongoDB:', error);
      });

      setJsonData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const ClassDataUpload = () => {
    // Handle the upload logic here
  };

  const renderItem = (item, index, isSelected) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {isSelected && <Text>Selected</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
        onChange={(item) => {
          setClass(item.classname);
        }}
        renderItem={renderItem}
      />

      <View style={styles.timeContainer}>
        <Button mode="contained" color="#FF0000" onPress={ClassDataSelect}>
          Select file
        </Button>

        <Button mode="contained" color="#FF0000" onPress={ClassDataUpload}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
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
});

export default YourComponent;

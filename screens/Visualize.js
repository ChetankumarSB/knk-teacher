import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import * as ExcelJS from 'exceljs';
import RNFS from 'react-native-fs';
import Dropdown from 'react-native-element-dropdown';

const AttendanceAndClassDataScreen = () => {
  const [classData, setClassData] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(5);
  const [selectedFormat, setSelectedFormat] = useState('day');

  useEffect(() => {
    fetchClassData();
    fetchAttendanceData();
  }, []);

  const fetchClassData = async () => {
    try {
      const response = await fetch(`http://172.20.10.9:8001/teacher/classdata/read?class=${selectedClass}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      data.shift(); // Remove the header row
      setClassData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(`http://172.20.10.9:8001/teacher/attendanceupdate/read?class=${selectedClass}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const absentStudents = data.filter(student => !student.isPresent);
      setAbsentStudents(absentStudents);
      console.log(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const getTotalStudents = () => {
    return classData.length;
  };

  const filterAttendanceData = (format) => {
    const currentDate = new Date();
    let fromDate, toDate;

    switch (format) {
      case 'month':
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        toDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
      case 'week':
        const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); // Sunday as the first day of the week
        fromDate = new Date(currentDate.setDate(firstDayOfWeek));
        toDate = new Date(currentDate.setDate(firstDayOfWeek + 6));
        break;
      case 'day':
        fromDate = new Date(currentDate);
        toDate = new Date(currentDate);
        break;
      case 'year':
        fromDate = new Date(currentDate.getFullYear(), 0, 1);
        toDate = new Date(currentDate.getFullYear(), 11, 31);
        break;
      default:
        return [];
    }

    return absentStudents.filter((student) => {
      const attendanceDate = new Date(student.date); // Assuming the date is available in the 'date' property
      return attendanceDate >= fromDate && attendanceDate <= toDate;
    });
  };

  const barChartData = {
    labels: ['Total Students', 'Present', 'Absent'],
    datasets: [
      {
        data: [getTotalStudents(), getTotalStudents() - absentStudents.length, absentStudents.length],
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Present',
      population: getTotalStudents() - absentStudents.length,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Absent',
      population: absentStudents.length,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundColor: '#f2f2f2',
    backgroundGradientFrom: '#f2f2f2',
    backgroundGradientTo: '#f2f2f2',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Attendance Data');

    sheet.columns = [
      { header: 'Student Name', key: 'name', width: 20 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Is Present', key: 'isPresent', width: 15 },
    ];

    const formattedAbsentStudents = filterAttendanceData(selectedFormat).map((student) => ({
      name: student.name,
      date: new Date(student.date).toDateString(),
      isPresent: 'Absent',
    }));

    sheet.addRows(formattedAbsentStudents);

    const filePath = `${RNFS.DocumentDirectoryPath}/attendance_${selectedFormat}.xlsx`;

    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file saved to ${filePath}`);

    if (Platform.OS === 'web') {
      const downloadLink = document.createElement('a');
      downloadLink.href = `file://${filePath}`;
      downloadLink.download = `attendance_${selectedFormat}.xlsx`;
      downloadLink.click();
    }
  };

  return (
    <View>
      <Text>Total number of students in the class: {getTotalStudents()}</Text>
      <Text>Total number of students absent: {absentStudents.length}</Text>

      <BarChart
        data={barChartData}
        width={400}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
      />

      <PieChart
        data={pieChartData}
        width={400}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text>Attendance in the last month: {filterAttendanceData('month').length}</Text>
      <Text>Attendance in the last week: {filterAttendanceData('week').length}</Text>
      <Text>Attendance today: {filterAttendanceData('day').length}</Text>

      <Text>Select Class:</Text>
      <Dropdown
        data={[
          { label: 'Class 5', value: 5 },
          { label: 'Class 6', value: 6 },
          { label: 'Class 7', value: 7 },
          { label: 'Class 8', value: 8 },
          { label: 'Class 9', value: 9 },
          { label: 'Class 10', value: 10 },
        ]}
        value={selectedClass}
        onChange={(itemValue) => setSelectedClass(itemValue)}
      />

      <Text>Select Format:</Text>
      <Dropdown
        data={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
          { label: 'Month', value: 'month' },
          { label: 'Year', value: 'year' },
        ]}
        value={selectedFormat}
        onChange={(itemValue) => setSelectedFormat(itemValue)}
      />

      <TouchableOpacity onPress={exportToExcel}>
        <Text>Export Data to Excel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AttendanceAndClassDataScreen;

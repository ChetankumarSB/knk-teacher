import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Snackbar from 'react-native-snackbar';
import RNFS from 'react-native-fs';
import axios from 'axios';

const Home = ({ title, author, date, image }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    receiveData(); // Initial data fetch

    // Set up a timer to periodically refresh the data
    const interval = setInterval(() => {
      receiveData();
    }, 5000); // Refresh every 5 seconds (adjust the interval as needed)

    return () => {
      clearInterval(interval); // Clear the timer on component unmount
    };
  }, []);

  const receiveData = async () => {
    try {
      // Fetch data from the server and update the state
      const response = await axios.get('http://  172.20.10.9:8001/teacher/imageupload/read');
      const getImages = response.data || [];

      if (getImages.length > 0) {
        const locatedImages = await Promise.all(getImages.map(async (image) => {
          const localName = image.name;
          const filePath = `${RNFS.DocumentDirectoryPath}/${localName}`;

          await RNFS.writeFile(filePath, image.baseimage, 'base64');
          console.log('File written successfully');

          const fileURI = `file://${filePath}`;
          return fileURI;
        }));

        setImageData(locatedImages.reverse()); // Reverse the array to display recently uploaded files at the top
        setServerData(getImages.reverse()); // Reverse the array to display recently uploaded files at the top
      } else {
        console.log('No image data found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    let base64response;
    try {
      base64response = await RNFS.readFile(parsedData[0].uri, 'base64');
    } catch (error) {
      console.log('Error:', error);
    }

    const imageObj = {
      name: parsedData[0].name,
      baseimage: base64response,
      head: text,
      description: description,
    };

    try {
      const response = await axios.post('http://  172.20.10.9:8001/teacher/imageupload/post', imageObj);
      console.log('Image uploaded');
      receiveData(); // Fetch updated data after upload
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImage = async (id) => {
    try {
      // Delete the image from the server
      await axios.delete(`http://  172.20.10.9:8001/teacher/imageupload/${id}`);
      console.log('Image deleted');
      receiveData(); // Fetch updated data after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const imageSelect = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const imageres = JSON.stringify(res);
      const parsedData = JSON.parse(imageres);
      setParsedData(parsedData);
    } catch (err) {
      setParsedData([]);
      if (DocumentPicker.isCancel(err)) {
        Snackbar.show({
          text: 'File selection canceled',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#242B2E',
        });
      } else {
        Snackbar.show({
          text: 'Something went wrong',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#D82E2F',
        });
        throw err;
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.titleText}>Hello, $TeacherUsername</Text>

        <View style={styles.card}>
          <View style={styles.content}>
            <TouchableOpacity onPress={imageSelect}>
              {parsedData[0]?.uri ? (
                <Image source={{ uri: parsedData[0].uri }} style={styles.image} />
              ) : (
                <Image source={require('../src/copy-upload.jpeg')} style={styles.image} />
              )}
            </TouchableOpacity>

            <TextInput label="Title" value={text} onChangeText={text => setText(text)} />

            <TextInput
              label="Description"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={description => setDescription(description)}
            />
          </View>
          <Button mode="contained" color="#FF0000" onPress={uploadImage}>
            Upload
          </Button>
        </View>

        {imageData.map((image, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.content}>
              <Image source={{ uri: image }} style={styles.image} />
              <Text style={styles.title}>{serverData[index]?.head}</Text>
              <Text style={styles.info}>{serverData[index]?.description}</Text>
            </View>
            <Button
              icon="delete"
              mode="contained"
              onPress={() => deleteImage(serverData[index]._id)}
              style={{ backgroundColor: '#D82E2F' }}
            >
              Delete
            </Button>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#242B2E',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default Home;

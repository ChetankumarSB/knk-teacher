import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Snackbar from 'react-native-snackbar';
import RNFS from 'react-native-fs';

const Home = ({ title, author, date, image }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    // TODO: Fetch data from the server and update the state
  }, []);

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
      title: text,
      description: description,
    };

    // TODO: Post the imageObj to the server
    console.log(imageObj);
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
          <Button icon="upload" mode="contained"  color="#FF0000"  onPress={uploadImage}>
              Upload
            </Button>
        </View>

        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={{ uri: 'https://cache.careers360.mobi/media/colleges/social-media/media-gallery/4075/2021/8/5/Campus%20View%20of%20KLE%20Institute%20of%20Technology%20Hubli_Campus-View.jpg' }}
              style={styles.image}
            />
            <Text style={styles.title}>Title{title}</Text>
            <Text style={styles.info}>10min ago{date}</Text>
          </View>
                    <Button
            icon="delete"
            mode="contained"
            onPress={uploadImage}
            style={{ backgroundColor: '#D82E2F' }}
          >
            Delete
          </Button>
          
        </View>
        
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

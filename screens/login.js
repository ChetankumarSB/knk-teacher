import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Axios from 'axios';

export default function App() {
  const [email, setEmail] = useState('');
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [otp, setOtp] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async () => {
    if (email.length === 0) {
      Snackbar.show({
        text: 'Please enter your email',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#D82E2F',
      });
    } else if (emailRegex.test(email)) {
      console.log('done');

      Snackbar.show({
        text: 'Sending email to ' + email,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#242B2E',
      });

      const emailServer = {
        email: email.toLowerCase(),
      };

      try {
        const response = await Axios.post('http://172.20.10.9:8001/mailsent', emailServer);
        console.log(response.data);

        if (response.status === 200) {
          Snackbar.show({
            text: response.data,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#4DD637',
          });

          setIsEmailEntered(true);
        } else {
          Snackbar.show({
            text: 'Something went wrong',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#D82E2F',
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      Snackbar.show({
        text: 'Invalid email address',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#D82E2F',
      });
    }
  };

  const otpValidation = async () => {
    const isNumeric = (value) => {
      return /^\d+$/.test(value);
    };

    if (isNumeric(otp)) {
      const emailServer = {
        usermail: email.toLowerCase(),
        crandomNum: otp,
      };

      try {
        const response = await Axios.post('http://172.20.10.9:8001/otpreceive', emailServer);
        console.log(response.status);

        if (response.status === 200) {
          Snackbar.show({
            text: 'Login',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#4DD637',
          });
        } else {
          Snackbar.show({
            text: 'Invalid OTP',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#D82E2F',
          });
        }
      } catch (error) {
        Snackbar.show({
          text: 'Invalid OTP',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#D82E2F',
        });
      }
    } else {
      Snackbar.show({
        text: 'Please enter a numeric value for OTP',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#D82E2F',
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require('../images/final1logo.png')} style={styles.logo} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>KLEIT Student Center</Text>
          {!isEmailEntered && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}

          {isEmailEntered && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                onChangeText={(text) => setOtp(text)}
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.button} onPress={otpValidation}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: 100,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#242B2E',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

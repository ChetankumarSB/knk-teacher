import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Axios from 'axios';

export default function App() {
  const [usn, setUsn] = useState('');
  const [isUsnEntered, setIsUsnEntered] = useState(false);
  const [otp, setotp] = useState('');  


  const handleLogin = async () => {

    var usnRegex = /^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;

    if((usn.length==0)){
        Snackbar.show({
            text: 'Please enter your USN',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#D82E2F',
          });
    }

    else if (usnRegex.test(usn)) {
      console.log("done")

      let uppercaseString = usn +'@kleit.ac.in';
      let usnString = uppercaseString.toLowerCase();
      
      Snackbar.show({
        text: 'Sending email to '+ usnString  ,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#242B2E',
      });

      const usnserver = {
        "usn" : usnString
      }
      
        
      try{
        const response = await Axios.post('http://172.20.10.3:8001/mailsent', usnserver);
        console.log(response.data);


        if(response.status==200){
                
      Snackbar.show({
        text: response.data,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#4DD637',
      });
    
      setIsUsnEntered(true);
        }
        else{
          Snackbar.show({
            text: 'Something went wrong',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#D82E2F',
          });
        }
 
    } catch (error) {
      console.error('Error:', error);
    }

    }
     else if (!usnRegex.test(usn)){
        Snackbar.show({
            text: 'Invalid email id',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#D82E2F',
          });
   }

    else{
        Snackbar.show({
            text: 'Something went wrong',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#D82E2F',
          });
    }

  };

  const otpvalidation = async () => {

    let uppercaseString = usn;
    let usnString = uppercaseString.toLowerCase();

    const isNumeric = (value) => {
      return /^\d+$/.test(value);
    };

    if(isNumeric(otp)){
  
    const usnserver = {
      "usermail" : usnString,
      "crandomNum" : otp
    }
       
    try{   
      const response = await Axios.post('http://172.20.10.3:8001/otpreceive', usnserver);
      console.log(response.status);
      

      if(response.status==200){
              
          Snackbar.show({
          text: 'Login',
         duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#4DD637',
      });
  }
  else{
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
      }else{
        Snackbar.show({
          text: 'Please Enter Numeric Value',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#D82E2F',
        });
      }
    
  };

    return (

    <ScrollView>
    <View style={styles.container}>
      <Image source={require('./images/final1logo.png')}
    style={ styles.logo }
       />
      <View style={styles.formContainer}>
        <Text style={styles.title}>KLEIT Student Center</Text>
        {!isUsnEntered && ( // Render the password textbox only if USN is entered
        <>
        <TextInput
          style={styles.input}
          placeholder="University Seat Number (USN)"
          onChangeText={text => setUsn(text)}
          value={usn}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </>
        )}

        {isUsnEntered && ( // Render the password textbox only if USN is entered
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            onChangeText={text => setotp(text)}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={otpvalidation}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
        </>
        )}


        
 
      </View>
    </View>
    </ScrollView>
  )};

const styles = StyleSheet.create({
   container: {
    flex: 1,
  },
    logo: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginTop: 100
      },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  passButton: {
    marginTop: 20
  }
});
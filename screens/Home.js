import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home1';
import Attendence from './screens/Attendence';
import Timetable from './screens/Timetable';
import Profile from './screens/Profile';
import Manage from './screens/Manage'
function HomeScreen() {
  return (
   
    <Home/>

  );
}

function AttendenceScreen() {
  return (

   <Attendence/>
  );
}

function TimetableScreen() {
  return (

   <Timetable/>

  );
}

function ProfileScreen() {
  return (

   <Profile/>

  );
}
function ManageScreen() {
  return (

  <Manage/>

  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator

        initialRouteName="Manage"
       
        screenOptions={({ route }) => ({
        
          tabBarHideOnKeyboard: true,
          
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Icon
                  name={
                    focused
                      ? 'home'
                      : 'home'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Attendence') {
              return (
                <Icon
                  name={focused ? 'calendar' : 'calendar'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Timetable') {
              return (
                <Icon
                  name={focused ? 'clock' : 'clock'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Profile') {
              return (
                <Icon
                  name={focused ? 'user' : 'user'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Manage') {
              return (
                <Icon
                  name={focused ? 'book' : 'book'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
        
      >


        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false,}}
          // options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen name="Attendence" options={{headerShown: false}} component={AttendenceScreen} />
        <Tab.Screen name="Timetable" options={{headerShown: false}} component={TimetableScreen} />
        <Tab.Screen name="Manage" options={{headerShown: false}} component={ManageScreen} />
        <Tab.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
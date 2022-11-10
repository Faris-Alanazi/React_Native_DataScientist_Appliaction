import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InviteScreen from './Screens/InviteScreen';
import CreateProject from './Screens/CreateProject.js';
import LoginScreen from './Screens/LoginScreen.js';
import RegisterScreen from './Screens/RegisterScreen.js';
import HomeScreen from './Screens/HomeScreen.js';
import ProfileScreen from './Screens/ProfileScreen.js';
import InviteInProfile from './Screens/InviteInProfile';
import DashBoard from './Screens/Dashboard';
import RoleScreen from './Screens/RoleScreen';
import TabScreen from './Screens/TabScreen';
import getRoles from './Screens/getRoles';
import ShowInvitesScreen from './Screens/showInvitesScreen'
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.mainview}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Role"
              component={RoleScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="InviteInProfile"
              component={InviteInProfile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DashBoard"
              component={DashBoard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="InviteScreen"
              component={InviteScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateProject"
              component={CreateProject}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          
          <Stack.Screen
              name="Test"
              component={TabScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="getRoles"
              component={getRoles}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShwoInvitesScreen"
              component={ShowInvitesScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          


        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:15,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  safearea: {
    height: '110%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: BACKGROUND,
  },
});
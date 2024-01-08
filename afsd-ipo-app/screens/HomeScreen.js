// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Remove the user data from local storage
      await AsyncStorage.removeItem('user');
      // Navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonTitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

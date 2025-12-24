import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const r = await API.post('/auth/login', { phone, password });
      await AsyncStorage.setItem('token', r.data.token);
      navigation.replace('Feed');
    } catch (e) {
      Alert.alert('Erreur', 'Identifiants incorrects');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🦅 DEO</Text>
      <TextInput 
        placeholder="Téléphone" 
        value={phone} 
        onChangeText={setPhone} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Mot de passe" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />
      <Button title="Se connecter" onPress={login} />
      <Button title="S'inscrire" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 16,
    backgroundColor: '#1a1a1a'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#333',

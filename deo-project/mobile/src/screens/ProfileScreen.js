export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    try {
      const r = await API.get('/users/me');
      setProfile(r.data);
    } catch (e) {
      console.error('Error loading profile:', e);
    }
  }

  if (!profile) return <View style={styles.container}><Text>Chargement...</Text></View>;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: profile.avatar_url || 'https://via.placeholder.com/100' }} 
        style={styles.avatar} 
      />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.phone}>{profile.phone}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
      <Text style={styles.vipStatus}>
        {profile.is_vip ? '✅ Compte VIP' : '❌ Compte Standard'}
      </Text>
      <Button 
        title="Devenir VIP" 
        onPress={() => navigation.navigate('VIP')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 16,
    backgroundColor: '#1a1a1a'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8
  },
  phone: {
    color: '#999',
    marginBottom: 8
  },
  bio: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16
  },
  vipStatus: {
    color: '#4a90e2',
    marginBottom: 16,
    fontWeight: 'bold'
  }
});
```



```javascript
import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import API from '../api';

export default function VIPScreen() {
  const [loading, setLoading] = useState(false);

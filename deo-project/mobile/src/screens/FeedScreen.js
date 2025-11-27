```javascript
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import API from '../api';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    try {
      const r = await API.get('/posts');
      setPosts(r.data);
    } catch (e) {
      console.error('Error fetching posts:', e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🦅 Fil DEO</Text>
        <TouchableOpacity 
          style={styles.newPostButton}
          onPress={() => navigation.navigate('NewPost')}
        >
          <Text style={styles.newPostText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList 
        data={posts} 
        keyExtractor={p => String(p.id)}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Image 
                source={{ uri: item.avatar_url || 'https://via.placeholder.com/40' }} 
                style={styles.avatar} 
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            {item.image_url && (
              <Image 
                source={{ uri: `http://10.0.2.2:4000${item.image_url}` }} 
                style={styles.postImage} 
              />
            )}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text>❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text>💬</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a1a'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  newPostButton: {
    backgroundColor: '#4a90e2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  newPostText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  post: {
    backgroundColor: '#2a2a2a',
    margin: 8,
    padding: 12,
    borderRadius: 8
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8

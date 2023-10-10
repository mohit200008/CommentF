// PostDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>Post {post.postId}</Text>
      <Text style={styles.postName}>{post.name}</Text>
      <Text style={styles.postEmail}>{post.email}</Text>
      <Text style={styles.postBody}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  postEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  postBody: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default PostDetailScreen;

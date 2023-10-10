import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const CommentsList = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.commentContainer}>
          <Text>{item.name}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default CommentsList;

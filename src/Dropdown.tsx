import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown = ({ posts, selectedPost, onPostChange }) => {
  const selectedPostData = posts.find(post => post.id === selectedPost);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <FlatList
        ListHeaderComponent={(
          <DropDownPicker
            items={posts.map(post => ({ label: post.title, value: post.id }))}
            defaultValue={selectedPost}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdownStyle}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={styles.dropDownStyle}
            onChangeItem={item => onPostChange(item.value)}
          />
        )}
        data={[{ key: 'dummy' }]} // Dummy data for the FlatList
        renderItem={() => (
          <View style={styles.selectedPostContainer}>
            {selectedPostData && (
              <>
                <Text style={styles.selectedPostTitle}>{selectedPostData.title}</Text>
                <Text>{selectedPostData.body}</Text>
              </>
            )}
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fafafa',
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
  },
  selectedPostContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedPostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Dropdown;

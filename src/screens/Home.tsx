// Home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(posts.length > 0 ? posts[0].postId : null);
    const [comments, setComments] = useState([]);
    const [open, setIsOpen] = useState(false)
    const [currentValue, setCurrentValue] = useState()

    const navigation = useNavigation(); 


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments?_limit=100')
            .then(response => {
                setComments(response.data);

                const uniquePosts = Array.from(new Set(response.data.map(comment => comment.postId)))
                    .map(postId => {
                        const postComments = response.data.find(comment => comment.postId === postId);
                        return {
                            postId,
                            name: postComments.name,
                            email: postComments.email,
                            body: postComments.body,
                        };
                    });
                setPosts(uniquePosts);

                setSelectedPostId(uniquePosts.length > 0 ? uniquePosts[0].postId : null);
            })
            .catch(error => console.error('Error fetching comments:', error));
    }, []);

    const onPostChange = (postToFind) => {
        console.log(postToFind)
        const selectedPostDetails = posts.find(post => post.email === postToFind);
        console.log(selectedPostDetails)
        setSelectedPost(selectedPostDetails);
    };

    const dropdownItems = posts.map(post => ({
        label: post.name,
        value: post.email
    }))


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Post Explorer</Text>
                    <DropDownPicker
                        items={dropdownItems}
                        open={!open}
                        setOpen={() => setIsOpen(!open)} 
                        value={currentValue}
                        setValue={(val) => setCurrentValue(val)}
                        onPress={() => onPostChange(currentValue)}
                        placeholder="Select a post"
                        containerStyle={styles.dropdownContainer}
                        style={styles.dropdownStyle}
                        labelStyle={styles.dropdownLabel}
                    />
            <ScrollView style={styles.scrollContainer}>
                {selectedPost && (
                    <TouchableOpacity
                        style={styles.postCard}
                        onPress={() => navigation.navigate('PostDetail', { post: selectedPost })}
                    >
                        <Text style={styles.postCardTitle}>Post {selectedPost.postId}</Text>
                        <Text style={styles.postCardSubtitle}>{selectedPost.email}</Text>
                        <Text numberOfLines={2} style={styles.postCardBody}>{selectedPost.body}</Text>
                    </TouchableOpacity>
                )}
                {posts.map(post => (
                    <TouchableOpacity
                        key={post.postId}
                        style={styles.postCard}
                        onPress={() => navigation.navigate('PostDetail', { post })}
                    >
                        <Text style={styles.postCardTitle}>Post {post.postId}</Text>
                        <Text style={styles.postCardSubtitle}>{post.email}</Text>
                        <Text numberOfLines={2} style={styles.postCardBody}>{post.body}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    dropdownContainer: {
        height: 40,
        marginBottom: 16,
    },
    dropdownStyle: {
        backgroundColor: '#fafafa',
    },
    dropdownLabel: {
        fontSize: 16,
        color: '#333',
    },
    scrollContainer: {
        flex: 1,
        marginTop: 16,
    },
    postCard: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 16,
    },
    postCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    postCardSubtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    postCardBody: {
        fontSize: 16,
        marginTop: 8,
        color: '#333',
    },
});

export default Home;

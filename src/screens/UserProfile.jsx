import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import arrowleft from '../../assets/arrow-left.svg';
import { AntDesign } from '@expo/vector-icons';

import axios from 'axios';
import ProfileComponent from '../components/ProfileComponent';

const UserProfile = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState([]); // Use user prop for initial profile state
  const navigation = useNavigation();
  const userId = route.params?.userId || 7; // Default to 7 if not provided

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.post(
          `https://marriage-application.onrender.com/getuser?id=${userId}`
        );
        if (response.status === 200) {
          setProfile(response.data);
        }
      } catch (err) {
        Alert.alert(err);
      }
    };
    checkLogin();
  }, []);
  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const [images, setImages] = useState([
    require('../../assets/1.png'),
    require('../../assets/2.png'),
    require('../../assets/3.png'),
    require('../../assets/4.png'),
  ]);
  // const images = user.photoGallery || []; // Use user's photoGallery or an empty array if undefined
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={[styles.iconButton, styles.topLeft]}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name='arrowleft' size={24} color='#9B9B9B' />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>الحساب</Text>
        </View>
        <ProfileComponent
          profile={profile}
          modalVisible={modalVisible}
          selectedImage={selectedImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountContainer: {
    marginTop: 50,
    marginRight: 20,
    alignItems: 'flex-end', // Aligns content to the right
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Ensures the row starts from the right
  },
  profileImage: {
    width: 23,
    height: 23,
    borderRadius: 5,
  },
  profileInfoContainer: {
    marginLeft: 65, // Adjust or remove based on your layout needs
  },
  profileInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileDetails: {
    fontSize: 12,
    color: '#666666',
  },
  profileImageLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileDescription: {
    marginTop: 10,
  },
  profileDescriptionText: {
    fontSize: 14,
    color: '#333333',
  },
  editButtonContainer: {
    marginTop: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff4d4d',
    textAlign: 'right', // Aligns button text to the right
  },
  subscriptionContainer: {
    marginTop: 20,
    marginRight: 20,
  },
  subscriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'right', // Aligns subscription text to the right
  },
  subscriptionOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  subscriptionOption: {
    width: '45%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 5,
    alignItems: 'center',
  },
  subscriptionOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  impContainer: {
    marginRight: 20,
    marginTop: 20,
    alignItems: 'flex-end', // Ensures "اساسيات" aligns to the right
  },
  additionalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Added color specification
    textAlign: 'right', // Aligns text to the right
  },
  groupParent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    width: 110,
    height: 34,
    borderWidth: 1,
    borderColor: '#485868',
    borderRadius: 13,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    color: 'pink',
  },
  habitsContainer: {
    marginRight: 20,
    marginTop: 20,
    alignItems: 'flex-end', // Ensures "عاداتي" aligns to the right
  },
  habitsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Added color specification
    textAlign: 'right', // Aligns text to the right
  },
  galleryContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    width: '100%', // Adjusted for full width to accommodate gallery alignment
  },
  galleryTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Added color specification
    marginBottom: 10,
    textAlign: 'right', // Aligns gallery title to the right
  },
  addPhotosText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4d4d', // Added color specification
    textAlign: 'right', // Aligns "اضافة صور" text to the right
  },
  galleryImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Aligns images to start from the right
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  galleryImageContainer: {
    width: '30%', // Adjust according to your layout preference
    marginBottom: 10,
  },
  galleryImage: {
    width: '100%',
    aspectRatio: 1, // Keeps the images square
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  fullSizeImage: {
    width: 250, // Adjust to keep the image square
    height: 250, // Match width for square aspect ratio
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  galleryImageContainer: {
    width: '32%', // Making images smaller as per request
    marginBottom: 10,
  },
  galleryImage: {
    width: '100%',
    height: undefined, // Height is determined by aspect ratio
    aspectRatio: 1, // Keeps the image square
    borderRadius: 10,
  },
  iconButton: {
    position: 'absolute',
    padding: 10,
    zIndex: 1,
  },
  topLeft: {
    top: 40,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#F2F2F2',
  },
});

export default UserProfile;

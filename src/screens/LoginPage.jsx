import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { userMethod } from '../../app/user';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({ route }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } =
        await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('تم رفض الإذن!');
      }
    })();

    (async () => {
      // Request permission to access the image library
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);
  const openImagePickerAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to the Forgot Password screen
  };
  const handleDownloadImage = () => {
    setShowOptions(true);
  };

  const handleContinue = async () => {
    const isValid = validatePassword(password);
    if (!isValid) {
      setPasswordError('Password must meet all requirements.');
      return;
    }
    setPasswordError('');
    console.log('username', username, 'password', password);
    try {
      const response = await axios.post(
        `https://marriage-application.onrender.com/login`,
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        dispatch(userMethod(response.data));
        navigation.navigate('MainHome');
      }
    } catch (error) {
      console.error('Error fetching data: ', error.data);
    }

    // navigation.navigate("", { imageUri: null }); //هنا حطو هوم سكرين
  };

  const validatePassword = (password) => {
    const lengthRegex = /.{8,}/; // At least 8 characters

    return lengthRegex.test(password);
  };

  return (
    <View style={styles.container}>
      {/* Title */}

      {/* Top-left arrow icon */}
      <TouchableOpacity
        style={[styles.iconButton, styles.topLeft]}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name='arrowleft' size={24} color='#9B9B9B' />
      </TouchableOpacity>

      {/* Top-right arrow icon */}
      <TouchableOpacity
        style={[styles.iconButton, styles.topRight]}
        onPress={handleContinue}
      >
        <AntDesign name='arrowright' size={24} color='#ECB7B7' />
      </TouchableOpacity>

      <Text style={styles.welcomeText}>مرحبًا بك مجددًا</Text>

      <TouchableOpacity onPress={handleDownloadImage}>
        <View style={styles.imageContainer}>
          {/* Profile picture content removed */}
        </View>
      </TouchableOpacity>

      {/* White Box Container */}
      <View style={styles.whiteBox}>
        <ScrollView>
          <Text style={styles.title}> تسجيل دخول</Text>
          <TextInput
            style={styles.input}
            placeholder='اسم المستخدم'
            value={username}
            onChangeText={setUsername}
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder='كلمة المرور'
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Entypo
                name={isPasswordVisible ? 'eye' : 'eye-with-line'}
                size={24}
                color='black'
              />
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
          {passwordError && (
            <Text style={styles.passwordRequirement}>
              Password must:
              {'\n'}- Be at least 8 characters long
              {'\n'}- Contain at least one uppercase letter
              {'\n'}- Contain at least one lowercase letter
              {'\n'}- Contain at least one number
              {'\n'}- Contain at least one symbol
            </Text>
          )}

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>نسيت كلمة المرور؟</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Image Picker Modal */}
      <Modal
        visible={showOptions}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.optionContainer}>
            {/* Options for selecting image */}
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.optionText}>إلغاء</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Background color for better visualization
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 60,
    color: 'black',
    textAlign: 'center',
    width: '100%',
  },
  whiteBox: {
    width: '90%',
    backgroundColor: 'rgba(236,183,183,0.5)',
    borderRadius: 25,
    padding: 20,
    position: 'absolute',
    top: 300,
    marginBottom: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 55,
    borderWidth: 1,
    borderColor: '#b2b8bf',
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 100,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 55,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    marginBottom: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  passwordInput: {
    flex: 1,
    textAlign: 'right',
    marginTop: 10,
  },
  toggleButton: {
    position: 'absolute',
    right: 250,
  },
  passwordRequirement: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'right',
    fontSize: 14,
    color: '#777',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  iconButton: {
    position: 'absolute',
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: -40,
    color: 'black',
    textAlign: 'center',
    width: '100%',
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
  topRight: {
    top: 40,
    right: 20,
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
  // New style for the "Forgot Password" link
  forgotPassword: {
    color: '#56a5ec',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProfileScreen;

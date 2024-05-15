import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { useFavorites } from './FavoritesContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase-config';
import { messagesMethod } from '../../../app/Message';
import { usersMethod } from '../../../app/users';
import Card from '../../components/Card';

const { width } = Dimensions.get('window');
const data = [
  {
    id: 1,
    name: 'شوق محمد',
    location: 'الرياض, المملكة العربية السعودية',
    image: require('../../../assets/g.jpg'),
    lastSeen: 'اخر اتصال قبل دقيقتين',
    lastSeenIcon: 'clock',
  },
  {
    id: 2,
    name: 'فيصل ابراهيم',
    location: 'الرياض, المملكة العربية السعودية',
    image: require('../../../assets/visibility.jpg'),
    lastSeen: 'اخر تواجد قبل دقيقتين',
    lastSeenIcon: 'clock',
  },
  {
    id: 3,
    name: 'ناديه صالح',
    location: 'اليمن',
    image: require('../../../assets/girltt.jpg'),
    lastSeen: 'اخر تواجد قبل 8 دقائق',
    lastSeenIcon: 'clock',
  },
];

const NoMoreCards = () => (
  <View style={styles.noMoreCards}>
    <Text style={styles.noMoreCardsText}>لا توجد بطاقات أخرى</Text>
  </View>
);

const HomeScreen = () => {
  const { favorites, toggleFavorite } = useFavorites(); // Correctly use useFavorites
  const [itemArr, setItem] = useState([]);
  const [favArr, setFavArr] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.post(
          `https://marriage-application.onrender.com/getall?gender=${userinfo.user.userArray.gender}`
        );
        dispatch(usersMethod(response.data));
        setItem(response.data);
      } catch (err) {
        Alert.alert(err);
      }

      const querySnapshot = await getDocs(collection(db, 'messages'));
      const myMsg = querySnapshot.docs.filter(
        (item) => item.data().user == userinfo.user.userArray.id
      );
      const idMap = {};
      myMsg.forEach((msgs) => {
        console.log(msgs.data().senderId);
        if (idMap[msgs.data().senderId]) {
          idMap[msgs.data().senderId].push(msgs.data());
        } else {
          idMap[msgs.data().senderId] = [msgs.data()];
        }
      });
      const resultArrays = Object.values(idMap);
      dispatch(messagesMethod(resultArrays));
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View></View>
      <SwipeCards
        cards={itemArr}
        renderCard={(cardData) => (
          <Card
            card={cardData}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(cardData.id)}
            favArr={favArr}
          />
        )}
        renderNoMoreCards={() => <NoMoreCards />}
        useNativeDriver = {true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: '#fff',
    paddingBottom: 20, // Add padding to the bottom
    paddingTop: 22,
    paddingHorizontal: 12,
  },
  card: {
    width: width * 0.88,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 90, // Add margin to the bottom
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFF',
    marginTop: -40, // Adjust as needed to position correctly within card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  detailText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'right',
  },
  icon: {
    marginRight: 5,
    color: 'white',
  },

  lastSeenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Adjust as needed
  },
  lastSeen: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right', // Align text to the right
  },
  lastSeenIconContainer: {
    marginRight: 5, // Add margin to the icon container
  },
  lastSeenIcon: {
    color: '#666',
  },
  imageContainer: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 42.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  profileImage: {
    top: -50,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  placeholderText: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    textAlign: 'center',
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#ECB7B7',
    marginVertical: 10,
  },
  infoBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  infoButton: {
    paddingHorizontal: 8, // Reduced padding to bring buttons closer
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#485868',
    borderWidth: 1,
    marginHorizontal: 2, // Reduced margin to bring buttons closer
    marginVertical: 5,
  },
  infoButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#485868',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute', // Position the container absolutely to allow positioning outside of the card
    bottom: -50, // Move the container up to make buttons appear outside
    left: 0, // Align with the left edge of the card
    right: 0, // Align with the right edge of the card
    alignItems: 'center', // Center the buttons horizontally
  },
  messageButton: {
    backgroundColor: '#485868',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  favoriteButton: {
    backgroundColor: '#485868',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  favoriteActive: {
    backgroundColor: '#ECB7B7', // Active favorite background color
  },
  icon: {
    color: 'white',
  },
  gradientButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCardsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  description: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export const profileData = data; // Export data if needed elsewhere
export default HomeScreen;

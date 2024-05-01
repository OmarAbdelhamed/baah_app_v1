import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFavorites } from './FavoritesContext';
import { profileData } from './HomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useSelector } from 'react-redux';
import Card from '../../components/Card';

const { width } = Dimensions.get('window');

const FavoriteScreen = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [favArr, setFavArr] = useState([]);
  const [itemArr, setItem] = useState([]);
  const userinfo = useSelector((state) => state);
  // const favoriteProfiles = profileData.filter((profile) =>
  //   favorites.includes(profile.id)
  // );
  useEffect(() => {
    const getFavUsers = async () => {
      try {
        const response = await axios.post(
          `https://marriage-application.onrender.com/getfav?id=${userinfo.user.userArray.id}`
        );
        setItem(response.data);
      } catch (err) {
        Alert.alert('Error:', err.message);
      }
    };
    getFavUsers();
  }, [itemArr]);

  const NoMoreCards = () => (
    <View style={styles.noMoreCards}>
      <Text style={styles.noMoreCardsText}>لا توجد بطاقات أخرى</Text>
    </View>
  );

  const renderProfile = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.detailContainer}>
            <EvilIcons name='location' size={20} style={styles.icon} />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailContainer}>
            <EvilIcons name='clock' size={20} style={styles.icon} />
            <Text style={styles.detailText}>{item.lastSeen}</Text>
          </View>
        </View>
        <Image
          source={item.image}
          style={styles.profileImage}
          resizeMode='cover'
        />
      </View>
      <Text style={styles.description}>
        ابحث عن رجل صادق ويخاف الله، يحب الوناسة والعمل ومتفهم ومرح ويكون مسؤول
        عن نفسه للزواج.
      </Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => {
            /* handle message action */
          }}
        >
          <FontAwesome name='envelope-o' size={24} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <FontAwesome name='star-o' size={24} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeCards
        cards={itemArr.length !== 0 ? itemArr : ''}
        renderCard={(cardData) => (
          <Card
            card={cardData}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(cardData.id)}
            favArr={favArr}
          />
        )}
        renderNoMoreCards={() => <NoMoreCards />}
        useNativeDriver={true}
      />

      {/* <FlatList
        data={itemArr}
        renderItem={renderProfile}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center', // Center the cards horizontally
  },
  card: {
    width: width * 0.85, // Make the card smaller
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 10,
    padding: 15,
    alignItems: 'center', // Center elements inside the card
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure the profile container takes the full width of the card
  },
  profileDetails: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10, // Ensure spacing between image and details
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  icon: {
    marginLeft: 5,
  },
  detailText: {
    fontSize: 14,
  },
  description: {
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10, // Add space above the action icons
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the icons at the bottom of the card
    width: '100%', // Ensure the action container takes the full width of the card
  },
  actionIcon: {
    marginHorizontal: 10, // Space out the icons
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
    shadowColor: '#ECB7B7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  favoriteButton: {
    backgroundColor: '#485868',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 12,
    shadowColor: '#ECB7B7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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

export default FavoriteScreen;

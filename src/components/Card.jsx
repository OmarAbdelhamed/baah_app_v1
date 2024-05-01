import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import { usersMethod } from '../../app/users';
import {
  addFavoriteMethod,
  favoriteMethod,
  removeFavoriteMethod,
} from '../../app/Favorite';

const { width } = Dimensions.get('window');
const Card = ({ card, toggleFavorite, isFavorite, favArr }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleCardPress = async () => {
    navigation.navigate('UserProfile', { userId: card.id });
  };
  const userinfo = useSelector((state) => state);
  const favStatus = favArr.filter((item) => {
    return card.id == item.id;
  });

  console.log(card.image);

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          {/* <Image
              source={require('./assets/girltt.jpg')}
              style={styles.profileImage}
              resizeMode="cover"
            /> */}
          <Image
            source={{ uri: card.image }}
            style={styles.profileImage}
            resizeMode='cover'
          />

          <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
            <Text style={styles.name}>{card.name}</Text>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Icon name='location' size={20} />
              <Text style={styles.detailText}>
                {card.country},{card.city}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Icon name={card.lastSeenIcon} size={20} />
              <Text style={styles.detailText}>
                اخر تواجد قبل{' '}
                {card.active_status && card.active_status.substring(12)} دقائق
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.description}>{card.pio}</Text>
        <View style={styles.infoBoxContainer}>{/* Info buttons... */}</View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.gradientButton, styles.messageButton]}
            onPress={() => {
              navigation.navigate('chat', {
                participant: card.id,
                name: card.name,
                image: card.image,
              });
            }}
          >
            <Icon name='envelope' size={30} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.gradientButton, styles.favoriteButton]}
            onPress={async () => {
              try {
                const response = await axios.post(
                  `https://marriage-application.onrender.com/addtofav?id=${userinfo.user.userArray.id}&favId=${card.id}`
                );
                // Alert.alert(response.data)
                if (response.status) {
                  toggleFavorite(card.id);
                  Alert.alert(response.data);
                  if (response.data === 'User added to fav') {
                    dispatch(addFavoriteMethod(card));
                  } else {
                    dispatch(removeFavoriteMethod(card.id));
                  }
                }
              } catch (err) {
                Alert.alert('Error:', err.message);
              }
            }}
          >
            <Icon
              name='star'
              size={30}
              style={[
                styles.icon,
                {
                  color:
                    isFavorite || favStatus.length == 1 ? 'white' : '#ECB7B7',
                },
              ]} // Directly apply color change here
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBoxContainer}>
          {card.marital_status_woman_man && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>
                {card.marital_status_woman_man}
              </Text>
            </TouchableOpacity>
          )}
          {card.religious_denomination && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>
                {card.religious_denomination}
              </Text>
            </TouchableOpacity>
          )}
          {card.skin_woman_man && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>{card.skin_woman_man}</Text>
            </TouchableOpacity>
          )}
          {card.height_woman && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>{card.height_woman}cm</Text>
            </TouchableOpacity>
          )}
          {card.weight_woman && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>{card.weight_woman}kg</Text>
            </TouchableOpacity>
          )}
          {card.smoking_drinking_woman_man && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>
                🚬 {card.smoking_drinking_woman_man}
              </Text>
            </TouchableOpacity>
          )}
          {card.work_status_woman_man && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>
                {card.work_status_woman_man}
              </Text>
            </TouchableOpacity>
          )}
          {card.need_kids_woman_man && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>
                {card.need_kids_woman_man}👧
              </Text>
            </TouchableOpacity>
          )}
          {card.educational_level_woman_man && (
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>
                {card.educational_level_woman_man}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: '#ECB7B7',
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
    shadowColor: '#ECB7B7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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
  description: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right',
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
});

export default Card;

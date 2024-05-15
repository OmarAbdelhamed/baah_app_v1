import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './tabScreens/HomeScreen';
import FavoriteScreen from './tabScreens/FavoriteScreen';
import MessageScreen from './tabScreens/MessageScreen';
import { FavoritesProvider } from './tabScreens/FavoritesContext';
import Profile from './Profile';
import SearchSubMenu from './tabScreens/SearchSubMenu';
import ProfileContainer from './tabScreens/ProfileContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userMethod } from '../../app/user';
import { useDispatch } from 'react-redux';
import SettingsScreen from './tabScreens/SettingsScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();
  const handleSearchPress = () => {
    navigation.navigate('Home');
    setIsPressed(!isPressed); // Toggle isPressed state
  };

  const handleLongPress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <View style={styles.plusButtonContainer}>
      {/* Display the SearchSubMenu when isPressed is true */}
      {isPressed && <SearchSubMenu onSelect={(type) => console.log(type)} />}
      <TouchableWithoutFeedback
        onPress={handleSearchPress}
        onLongPress={handleLongPress}
      >
        <View
          style={[
            styles.searchButton,
            isPressed ? { backgroundColor: '#ECB7B7' } : null,
          ]}
        >
          <AntDesign name='search1' size={30} color='#fff' />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// const Sidebar = ({ onClose = () => {} }) => {
//   const navigation = useNavigation();

//   const handleNavigation = (screenName) => {
//     navigation.navigate(screenName);
//     onClose(); // Close the sidebar after navigation
//   };

//   const sidebarItems = [
//     { screenName: 'Settings', icon: 'cog' },
//     { screenName: 'Subscription', icon: 'credit-card' },
//     { screenName: 'Profile', icon: 'user' },
//     { screenName: 'AboutApp', icon: 'info-circle' },
//     { screenName: 'Logout', icon: 'sign-out' },
//   ];
//   const dispatch = useDispatch();

//   return (
//     <TouchableWithoutFeedback onPress={onClose}>
//       <View style={styles.sidebarContainer}>
//         {sidebarItems.map((item, index) => (
//           <TouchableWithoutFeedback
//             key={index}
//             onPress={async () => {
//               if (item.screenName === 'Logout') {
//                 dispatch(userMethod({}));
//                 navigation.navigate('Login', {
//                   state: 'register',
//                 });
//               } else {
//                 handleNavigation(item.screenName);
//               }
//               // if(item.screenName==="Logout"){
//               //   onPress={async()=>{
//               //     await AsyncStorage.removeItem('login');
//               //     navigation.navigate("Login");

//               //   }}
//               // }else{
//               //   handleNavigation(item.screenName)

//               // }
//             }}
//           >
//             <View style={styles.sidebarItem}>
//               <FontAwesome name={item.icon} size={24} color='black' />
//               <Text style={styles.sidebarItemText}>{item.screenName}</Text>
//             </View>
//           </TouchableWithoutFeedback>
//         ))}
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

const MainHome = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigation = useNavigation();

  const handleMenuPress = () => {
    // Toggle sidebar visibility
    setShowSidebar(!showSidebar);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleMyProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <FavoritesProvider>
      <TouchableWithoutFeedback onPress={handleCloseSidebar}>
        <View style={styles.container}>
          {/* Sidebar */}
          {/* {showSidebar && <Sidebar onClose={handleCloseSidebar} />} */}

          {/* Profile Container and Menu Icon */}
          <TouchableOpacity onPress={handleMyProfile}>
            <View style={styles.profileMenuContainer}>
              <ProfileContainer  />
              {/* <TouchableWithoutFeedback onPress={handleMenuPress}>
              <View style={styles.menuButton}>
                <MaterialCommunityIcons name='menu' size={24} color='black' />
              </View>
            </TouchableWithoutFeedback> */}
            </View>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <Tab.Navigator
              initialRouteName='Home'
              screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                  elevation: 0,
                  backgroundColor: '#ffffff',
                  height: 90,

                  ...styles.shadow,
                },
              }}
            >
              <Tab.Screen
                name='home'
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.tabIconContainer}>
                    
                 <MaterialCommunityIcons name="cards" size={30} color={focused ? '#ECB7B7' : '#4B5867'}/>
                    </View>
                  ),
                }}
              />

              <Tab.Screen
                name='Message'
                component={MessageScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.tabIconContainer}>
                 
                <AntDesign name="mail" size={30}  color={focused ? '#ECB7B7' : '#4B5867'}/>
                
                    </View>
                  ),
                }}
              />

              {/* <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                  tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
              /> */}

<Tab.Screen
                name='Search'
                component={SearchScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={[styles.searchButton,styles.tabIconContainer]}>
                                 <AntDesign name="search1" size={30} color={focused ? '#ECB7B7' : '#fff'} />

               
                    </View>
                  ),
                }}
              />

              <Tab.Screen
                name='Favorite'
                component={FavoriteScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.tabIconContainer}>
                      <MaterialCommunityIcons
                        name={focused ? 'star' : 'star-outline'}
                        size={30}
                        color={focused ? '#ECB7B7' : '#4B5867'}
                      />
               
                    </View>
                  ),
                }}
              />

              <Tab.Screen
                name='Setting'
                component={SettingsScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.tabIconContainer}>
                   
              


<AntDesign name="setting" size={30} color={focused ? '#ECB7B7' : '#4B5867'} />
                      {/* <Text
                        style={{
                          color: focused ? '#ECB7B7' : '#4B5867',
                          fontSize: 12,
                        }}
                      >
                        الاعدادات
                      </Text> */}
                    </View>
                  ),
                }}
              />
            </Tab.Navigator>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </FavoritesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  sidebarContainer: {
    backgroundColor: '#fff',
    width: 200,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sidebarItemText: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
  },

  profileMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
  },

  shadow: {
    shadowColor: '#7F5D50',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    color: '#4B5867', // Default color
  },
  plusButtonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    bottom: 50,
    left: 0,
    right: 0,
  },
  searchButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4B5867', // Default color
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarContainer: {
    backgroundColor: '#fff',
    width: 200,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MainHome;

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './app/Store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splashsc from './src/screens/Splashsc';
import Login from './src/screens/Login';
import LoginOTP from './src/screens/LoginOTP';
import GeneralQ from './src/screens/GeneraIQ';
import GirlsQ from './src/screens/GirlsQ';
import BoysQ from './src/screens/BoysQ';
import Daily from './src/screens/Daily';
import LogInPage from './src/screens/LoginPage';
import BioScreen from './src/screens/BioScreen';
import SplashTwo from './src/screens/SplashTwo';
import Visibility from './src/screens/Visibility';
import MainHome from './src/screens/MainHome';
import SignInPage from './src/screens/SignInPage';
import UserProfile from './src/screens/UserProfile';
import SettingsScreen from './src/screens/SettingsScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import VerifyPassScreen from './src/screens/VerifyPass';
import Subscription from './src/screens/Subscription';
import NewChat from './src/screens/Chat';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import AboutApp from './src/screens/AboutUs';
import PaymentScreen from './src/screens/PaymentScreen';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import PasswordResetConfirmationScreen from './src/screens/PasswordResetConfirmation';

const Stack = createStackNavigator();

export default function App() {
  const toggleDarkMode = AsyncStorage.getItem('stringValue');
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyle: { backgroundColor: 'white' },
              headerShown: false,
            }}
          >
            <Stack.Screen name='Splashsc' component={Splashsc} />
            <Stack.Screen name='SplashTwo' component={SplashTwo} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='LoginOTP' component={LoginOTP} />
            <Stack.Screen name='GeneralQ' component={GeneralQ} />
            <Stack.Screen name='GirlsQ' component={GirlsQ} />
            <Stack.Screen name='BoysQ' component={BoysQ} />
            <Stack.Screen name='Daily' component={Daily} />
            <Stack.Screen name='LogInPage' component={LogInPage} />
            <Stack.Screen name='Visibility' component={Visibility} />
            <Stack.Screen name='BioScreen' component={BioScreen} />
            <Stack.Screen name='MainHome' component={MainHome} />
            <Stack.Screen name='SignInPage' component={SignInPage} />
            <Stack.Screen name='UserProfile' component={UserProfile} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
            <Stack.Screen
              name='ChangePassword'
              component={ChangePasswordScreen}
            />
            <Stack.Screen name='VerifyPass' component={VerifyPassScreen} />
            <Stack.Screen name='Subscription' component={Subscription} />
            {/* <Stack.Screen name="chat" component={Chat} /> */}
            <Stack.Screen name='chat' component={NewChat} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
            <Stack.Screen name='AboutApp' component={AboutApp} />
            <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
            <Stack.Screen
              name='ForgotPassword'
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name='PasswordResetConfirmation'
              component={PasswordResetConfirmationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

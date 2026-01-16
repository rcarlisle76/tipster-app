import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthContext';

// Import all screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfilePicScreen from './src/screens/ProfilePicScreen';
import HomeScreen from './src/screens/HomeScreen';
import MeScreen from './src/screens/MeScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PostScreen from './src/screens/PostScreen';
import FollowingScreen from './src/screens/FollowingScreen';
import FollowersScreen from './src/screens/FollowersScreen';
import MyReviewsScreen from './src/screens/MyReviewsScreen';
import InboxScreen from './src/screens/InboxScreen';
import HelpScreen from './src/screens/HelpScreen';
import HelpDetailScreen from './src/screens/HelpDetailScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import AccountSettingsScreen from './src/screens/AccountSettingsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import AboutScreen from './src/screens/AboutScreen';
import ChangePasswordScreen from './src/screens/settings/ChangePasswordScreen';
import TwoFactorAuthScreen from './src/screens/settings/TwoFactorAuthScreen';
import ProfilePhotoScreen from './src/screens/settings/ProfilePhotoScreen';
import LoginActivityScreen from './src/screens/settings/LoginActivityScreen';
import PostVisibilityScreen from './src/screens/settings/PostVisibilityScreen';
import TaggingSettingsScreen from './src/screens/settings/TaggingSettingsScreen';
import CommentsSettingsScreen from './src/screens/settings/CommentsSettingsScreen';
import PaymentMethodsScreen from './src/screens/settings/PaymentMethodsScreen';
import BillingHistoryScreen from './src/screens/settings/BillingHistoryScreen';
import SubscriptionScreen from './src/screens/settings/SubscriptionScreen';
import EmailPreferencesScreen from './src/screens/settings/EmailPreferencesScreen';
import BlockedUsersScreen from './src/screens/settings/BlockedUsersScreen';
import DownloadDataScreen from './src/screens/settings/DownloadDataScreen';
import DeleteAccountScreen from './src/screens/settings/DeleteAccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ProfilePic" component={ProfilePicScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Me" component={MeScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name="Following" component={FollowingScreen} />
          <Stack.Screen name="Followers" component={FollowersScreen} />
          <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
          <Stack.Screen name="Inbox" component={InboxScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="HelpDetail" component={HelpDetailScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
          <Stack.Screen name="ProfilePhoto" component={ProfilePhotoScreen} />
          <Stack.Screen name="LoginActivity" component={LoginActivityScreen} />
          <Stack.Screen name="PostVisibility" component={PostVisibilityScreen} />
          <Stack.Screen name="TaggingSettings" component={TaggingSettingsScreen} />
          <Stack.Screen name="CommentsSettings" component={CommentsSettingsScreen} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <Stack.Screen name="BillingHistory" component={BillingHistoryScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="EmailPreferences" component={EmailPreferencesScreen} />
          <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
          <Stack.Screen name="DownloadData" component={DownloadDataScreen} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

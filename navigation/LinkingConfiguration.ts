/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../@types';
// import LoginPrivacy from "../screens/loginPrivacy/LoginPrivacy";
// import Wallet from "../screens/wallet/Wallet";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Theater: {
            screens: {
              TheaterScreen: 'Theater',
            },
          },
          Player: {
            screens: {
              PlayerScreen: 'Player',
            },
          },
          Self: {
            screens: {
              SelfScreen: 'Self',
            },
          },
        },
      },
      SecondaryPlayer: 'SecondaryPlayer',
      Drama: 'Drama',
      ViewingRecords: 'ViewingRecords',
      FeedBack: 'FeedBack',
      AboutUs: 'AboutUs',
      TaskCheckIn: 'TaskCheckIn',
      Setting: 'Setting',
      LoginPrivacy: 'LoginPrivacy',
      Wallet: 'Wallet',
      Login: 'Login',
      VerificationCode: 'VerificationCode',
    },
  },
};

export default linking;

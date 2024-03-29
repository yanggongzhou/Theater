import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { RootStackParamList, RootStackScreenProps } from "../@types";
import Drama from "../screens/drama/Drama";
import ViewingRecords from "../screens/viewingRecords/ViewingRecords";
import AboutUs from "../screens/about/AboutUs";
import FeedBack from "../screens/feedBack/FeedBack";
import TaskCheckIn from "../screens/task/TaskCheckIn";
import Setting from "../screens/setting/Setting";
import LoginPrivacy from "../screens/loginPrivacy/LoginPrivacy";
import Wallet from "../screens/wallet/Wallet";
import Login from "../screens/login/Login";
import VerificationCode from "../screens/login/VerificationCode";
import AutoOrder from "../screens/autoOrder/AutoOrder";
import SecondaryPlayer from "../screens/secondaryPlayer/SecondaryPlayer";
import BottomTabNavigator from "./BottomTabNavigator";

const whiteOptions = (headerTitle: string): { headerTitleAlign: string; headerBackTitle: string; headerTintColor: string; gestureEnabled: boolean; headerTitle: string; headerStyle: { backgroundColor: string } } => ({
  headerBackTitle: '返回',
  headerTintColor: '#0F0F0F',
  headerTitle,
  headerTitleAlign: 'left',
  gestureEnabled: true, // 手势可操作
  headerStyle: { backgroundColor: '#FFFFFF' },
})

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPrivacy"
        component={LoginPrivacy}
        options={({ navigation }: RootStackScreenProps<'LoginPrivacy'>) => ({
          headerShown: false,
        })}/>
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }: RootStackScreenProps<'Login'>) => ({
          ...whiteOptions('登录'),
          headerTitleAlign: 'left',
        })}/>
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCode}
        options={({ navigation }: RootStackScreenProps<'VerificationCode'>) => ({
          ...whiteOptions('登录'),
          headerTitleAlign: 'left',
        })}/>

      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen
        navigationKey="SecondaryPlayer"
        name="SecondaryPlayer"
        component={SecondaryPlayer}
        options={({ navigation }: RootStackScreenProps<'SecondaryPlayer'>) => ({
          headerBackTitle: '',
          headerTitle: '',
          // headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'left',
          gestureEnabled: true, // 手势可操作
          headerStyle: { backgroundColor: '#0F0F0F' },
          headerLeft: () => <Pressable onPress={() => navigation.replace('Root', { screen: 'Theater' })}>
            <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
          </Pressable>
        })}/>
      <Stack.Screen
        navigationKey="Drama"
        name="Drama"
        component={Drama}
        options={({ navigation }: RootStackScreenProps<'Drama'>) => ({
          headerBackTitle: '返回',
          headerTitle: '我的追剧',
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'left',
          gestureEnabled: true, // 手势可操作
          headerStyle: { backgroundColor: '#0F0F0F' },
        })}/>
      <Stack.Screen
        name="ViewingRecords"
        component={ViewingRecords}
        options={() => ({
          ...whiteOptions('观看记录'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ navigation }: RootStackScreenProps<'AboutUs'>) => ({
          ...whiteOptions('关于我们'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="FeedBack"
        component={FeedBack}
        options={() => ({
          ...whiteOptions('意见反馈'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="TaskCheckIn"
        component={TaskCheckIn}
        options={() => ({
          ...whiteOptions('任务和签到'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={() => ({
          ...whiteOptions('设置'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="AutoOrder"
        component={AutoOrder}
        options={() => ({
          ...whiteOptions('自动解锁管理'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={({ navigation }: RootStackScreenProps<'Wallet'>) => ({
          ...whiteOptions('我的账户'),
          headerTitleAlign: 'left',
        })}/>
    </Stack.Navigator>
  );
}

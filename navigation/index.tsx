/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ColorSchemeName, Pressable, Text, View } from 'react-native';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Theater from '../screens/theater/Theater';
import Player from '../screens/player/Player';
import TabThreeScreen from '../screens/TabThreeScreen';
import { DrawerParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator } from "@react-navigation/drawer";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Details"
        onPress={() => console.log("1234")}
      />
    </View>
  )
}

function RootNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>

    </Drawer.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const HomeHeader = (props: {title: string}) => (
    <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(15, 15, 15, 1)', display: 'flex', justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#BBBBBB', paddingLeft: 15, paddingBottom: 12}}>{props.title}</Text>
    </View>
  )
  return (
    <BottomTab.Navigator
      initialRouteName="Player"
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarBackground: () => <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(15, 15, 15, 1)'}}/>
      }}>
      <BottomTab.Screen
        name="Theater"
        component={Theater}
        options={({ navigation }: RootTabScreenProps<'Theater'>) => ({
          title: '剧场',
          headerTitleStyle: {
            opacity: 0
          },
          // headerTitleAlign: 'left',
          headerBackground: () => <HomeHeader title={'繁花剧场'}/>,
          tabBarIcon: ({ color }) => <Entypo name="grid" size={24} color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Player"
        component={Player}
        options={{
          title: '在看',
          headerTitleStyle: {
            opacity: 0
          },
          tabBarIcon: ({ color }) => <AntDesign name="play" size={24} color={color} />,
          headerBackground: () => <HomeHeader title={'繁花剧场'}/>,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          title: '我的',
          headerTitleStyle: {
            opacity: 0
          },
          headerBackground: () => <HomeHeader title={'个人中心'}/>,
          tabBarIcon: ({ color }) => <AntDesign name="smileo" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

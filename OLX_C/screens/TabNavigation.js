import React, { useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen'
import ProductScreen from './ProductScreen'
import ProfilePage from '../components/ProfilePage'
import SigninPage from "../components/SigninPage"
import AddAds from '../components/AddAds'
import { Icon } from 'native-base'
import { useSelector } from 'react-redux'
export default function TabNavigation() {
    const Tab = createMaterialBottomTabNavigator();
    const loginUser = useSelector(state => state.auth)
    return <>
        <Tab.Navigator
            activeColor="#178a2a"
            inactiveColor="#1f257a"
            barStyle={{ backgroundColor: "#f5fafa", height: 70, paddingVertical: 5, }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <Icon name='home' style={{ color: { color } }} />
                }}

            />
            {loginUser?
                <></> : <Tab.Screen
                    name="Sigin"
                    component={SigninPage}
                    options={{
                        tabBarLabel: 'Sign in',
                        tabBarIcon: ({ color }) => <Icon name='person-add-sharp' style={{ color: { color }, fontSize: 26 }} />
                    }}

                />}
            <Tab.Screen
                name="AddAds"
                component={AddAds}
                options={{
                    tabBarLabel: 'Add Ads',
                    tabBarIcon: ({ color }) => <Icon name='share-sharp' style={{ color: { color }, fontSize: 26 }} />
                }}
            />
            {loginUser && <Tab.Screen
                name="Profile"
                component={ProfilePage}
                options={{
                    tabBarLabel: 'User Profile',
                    tabBarIcon: ({ color }) => <Icon name='man-sharp' style={{ color: { color } }} size={26} />
                }}
            />}
            <Tab.Screen
                name="Products"
                component={ProductScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color }) => <Icon name='layers-sharp' style={{ color: { color } }} size={26} />
                }}
            />
        </Tab.Navigator>



    </>
}
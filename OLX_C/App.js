/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Slider from './screens/Slider'
import { Root } from "native-base";
import SingleProduct from './components/forProducts/SingleProduct';
import Cart from './components/forProducts/Cart'
import ProfilePage from './components/ProfilePage'
import TabNavigation from './screens/TabNavigation'
import loginPage from './components/loginPage'
import ChatScreen from './screens/ChatScreen'
import UpdateUserInfoForm from './components/UpdateUserInfo'
import ProductScreen from './screens/ProductScreen'
const Drawer = createDrawerNavigator();
const App: () => Node = () => {
  return (
    <Root>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={props => <Slider {...props} />}
        >
          <Drawer.Screen name="Tab" component={TabNavigation} />
          <Drawer.Screen name="SingleProduct" component={SingleProduct} />
          <Drawer.Screen name="Cart" component={Cart} />
          <Drawer.Screen name="Profile" component={ProfilePage} />
          <Drawer.Screen name="Login" component={loginPage} />
          <Drawer.Screen name="chatwithAdmin" component={ChatScreen} />
          <Drawer.Screen name="Update" component={UpdateUserInfoForm} />
          <Drawer.Screen name="Products" component={ProductScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Root>
  );
};
export default App;
// 4 child  ==> home & product added in tab
//   unmountOnBlur={true}
// options={{ unmountOnBlur: true }}
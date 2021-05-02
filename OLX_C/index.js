/**
 * @format
 */
 import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import reduxStore from './Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
const RNRedux = () => {
    const { Store, Persistor } = reduxStore()
    return <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
            <App />
        </PersistGate>
    </Provider>
}

AppRegistry.registerComponent(appName, () => RNRedux);

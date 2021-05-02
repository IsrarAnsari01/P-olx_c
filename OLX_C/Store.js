import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
let initializer = {
    auth: null,
    products: []
}
function reducer(state = initializer, action) {
    switch (action.type) {
        case 'Login':
            return { ...state, auth: action.payload }
        case 'UpdateCard':
            console.log(action.payload)
            return { ...state, auth: { ...state.auth, card: [...state.auth.card, action.payload] } }
        case 'UpdateWishlist':
            return { ...state, auth: { ...state.auth, wishlist: [...state.auth.wishlist, action.payload] } }
        case 'updateProducts':
            console.log(action.payload)
            return { ...state, products: action.payload }
        case 'Logout':
            return {
                ...state, auth: null
            }
        default:
            return { ...state }
    }
}
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
export default () => {
    let Store = createStore(persistedReducer)
    let Persistor = persistStore(Store)
    return { Store, Persistor }
}



import {createStore} from 'redux'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'


const persistConfig = {
    key: 'root',
    storage,
  }



  const persistedReducer = persistReducer(persistConfig,rootReducer)


  export const store = createStore(persistedReducer,composeWithDevTools());
  
  export const persiststore = persistStore(store)




// const store = createStore(rootReducer,composeWithDevTools())






export default store
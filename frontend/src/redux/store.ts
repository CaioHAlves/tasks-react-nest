import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  getStoredState
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import user from './modules/user'
import tasks from './modules/tasks'

const reducers = combineReducers({
  tasks,
  user
})

const persistConfig = {
  key: 'tasks',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})
const persistor = persistStore(store)

function persistorInit() {
  getStoredState({
    storage,
    key: 'tasks'
  })
}

persistorInit()

export type RootState = ReturnType<typeof store.getState>
export { store, persistor }

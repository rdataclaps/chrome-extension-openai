import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import chatMessageReducer from './reducers/chatMessageReducer';
import chatReducer from './reducers/chatReducer';
import customerReducer from './reducers/customerReducer';
import fileReducer from './reducers/fileReducer';
import receiptReducer from './reducers/receiptReducer';
import templateReducer from './reducers/templateReducer';
import userReducer from './reducers/userReducer';
import workspaceReducer from './reducers/workspaceReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

const rootReducer = combineReducers({
  user: userReducer,
  file: fileReducer,
  chat: chatReducer,
  template:templateReducer,
  message: chatMessageReducer,
  receipt: receiptReducer,
  customer: customerReducer,
  workspace: workspaceReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   persistedReducer,
//   applyMiddleware(thunk)
// );

// const persistor = persistStore(store);

// export { store, persistor };

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    )
);

export { store };

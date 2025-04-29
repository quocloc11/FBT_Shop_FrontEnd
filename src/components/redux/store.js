// import { configureStore } from '@reduxjs/toolkit'
// import { userReducer } from './user/userSlice'
// import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import { productReducer } from './product/productSlice'
// import { orderReducer } from './cart/cartSlice'
// const rootPersistConfig = {
//   key: 'root',
//   storage: storage,
//   whitelist: ['user']
//   //blacklist: ['auth']
// }

// const reducers = combineReducers({

//   user: userReducer,
//   product: productReducer

// })

// const persistedReducers = persistReducer(rootPersistConfig, reducers)


// export const store = configureStore({
//   reducer: {
//     persisted: persistedReducers,  // Nếu persistedReducer là một reducer đã kết hợp nhiều reducer khác
//     orders: orderReducer,         // Nếu bạn có một orderReducer riêng biệt
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
// })



import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user/userSlice';
import { productReducer } from './product/productSlice';
import { orderReducer } from './order/orderSlice';
import { cartReducer } from './cart/cartSlice';

// Persist config CHỈ CHO 'user'
const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'] // hoặc thêm 'info' nếu cần
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['carts'] // tuỳ theo tên state trong cartSlice, có thể là 'cartItems' hoặc 'items'
};

// Gộp reducer lại
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer), // persist riêng user
  product: productReducer,
  orders: orderReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


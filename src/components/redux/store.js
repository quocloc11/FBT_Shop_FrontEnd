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
  whitelist: ['carts']
};

// Gộp reducer lại
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
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


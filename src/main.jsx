import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { store } from './components/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { ConfirmProvider } from 'material-ui-confirm';

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ConfirmProvider defaultOptions={{
        }}>
          <App />
        </ConfirmProvider >
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  <App />

)

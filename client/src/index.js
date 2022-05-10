import { configureStore } from '@reduxjs/toolkit';
import rootReducers from "./reducers";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { getNotes } from './actions/note.action';

const store = configureStore({reducer: rootReducers})

store.dispatch(getNotes());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


import Routes from "./components/Routes";
import './styles/index.scss';

import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from "redux";
import rootReducers from "./reducers";

import { Provider, thunk } from "react-redux";

const store = configureStore({reducer: rootReducers})

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;

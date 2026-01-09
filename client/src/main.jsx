import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import '../src/assets/css/reset.css';
import '../src/assets/css/index.css';
import App from './App.jsx';
import  {store,persistor} from './redux/store.js';
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
);

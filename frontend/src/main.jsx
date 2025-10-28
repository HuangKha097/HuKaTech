import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '../src/assets/css/reset.css';
import '../src/assets/css/index.css';
import App from './App.jsx';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
);

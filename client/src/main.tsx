import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./features/store";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
)

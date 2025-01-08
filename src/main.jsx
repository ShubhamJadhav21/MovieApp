
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../src/Components/Language/i18.jsx'
import {Provider} from 'react-redux'
import store from './store/index.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <App />
     <ToastContainer autoClose={1000}/>
  </Provider>
   

)

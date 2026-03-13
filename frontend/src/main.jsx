import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Store } from './redux/Store.js'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={Store}>
    <App/>
  </Provider>
  </BrowserRouter>
)

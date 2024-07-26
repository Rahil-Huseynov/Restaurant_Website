import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.ts'
import Profil from './components/Profil/Profil.tsx'
import Profil_Login from './components/Profil_Login/Profil_Login.tsx'
import Cart_Login from './components/Cart_Login/Cart_Login.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'profil',
    element: <Profil />
  },
  {
    path: 'profil_login',
    element: <Profil_Login />
  },
  {
    path: 'cart_login',
    element: <Cart_Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

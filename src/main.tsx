import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.ts'
import Profil from './components/Profil/Profil.tsx'
import Profil_Login from './components/Profil_Login/Profil_Login.tsx'
import Cart_Login from './components/Cart_Login/Cart_Login.tsx'
import Admin from './components/Admin/Admin.tsx'
import Admin_Orders from './components/Admin_Orders/Admin_Orders.tsx'
import Home from './components/Home/Home.tsx'

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
  },
  {
    path: 'admin',
    element: <Admin />
  },
  {
    path: 'admin/adminorders',
    element: <Admin_Orders />
  }
  ,
  {
    path: 'home',
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

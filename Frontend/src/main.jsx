import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import router from './app/app.routes.jsx'
import { Provider } from 'react-redux'
import { store } from './app/app.store.js'
createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>

    <RouterProvider router={router} />
    </Provider>
  
)

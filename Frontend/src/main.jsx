import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { store } from './app/app.store.js'
import router from './app/app.routes.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* Global toast notification system */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f1f5f9',
            borderRadius: '12px',
          },
          classNames: {
            success: 'toast-success',
            error: 'toast-error',
          },
        }}
        richColors
      />
    </Provider>
  </HelmetProvider>
)

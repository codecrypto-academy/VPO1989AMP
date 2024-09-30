import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Cesta } from './components/Cesta'
import { Productos } from './components/Productos'
import { Home } from './components/Home'
import { Producto } from './components/Producto'
import { App } from './components/App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <App></App>
  </React.StrictMode>
)

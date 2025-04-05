import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import DetailView from './routes/DetailView';
import Layout from './routes/Layout';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="coin/:symbol" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

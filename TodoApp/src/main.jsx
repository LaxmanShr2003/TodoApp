import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <h1 class="text-5xl font-bold underline text-blue-600">Hello world!</h1>
  </StrictMode>,
);

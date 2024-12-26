import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'; 

//pages
import Home from './routes/Home.jsx';
import Countdown from './routes/Countdown.jsx';

//context
import { CountdownProvider } from './context/CountdownContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/countdown",
        element: <Countdown/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Dessa forma todas as rotas acessam o contexto */}
    <CountdownProvider>
      <RouterProvider router={router}/>
    </CountdownProvider>
  </StrictMode>,
);

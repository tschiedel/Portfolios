import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from './routes/Home.jsx';
import NewPost from './routes/NewPost.jsx';
import Post from './routes/Post.jsx';
import Admin from './routes/Admin.jsx';
import EditPost from './routes/EditPost.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/new',
        element: <NewPost/>,
      },
      {
        path: "/posts/:id", // os : significam que recebe um id dinâmico
        element: <Post/>,
      },
      {
        path: "/admin",
        element: <Admin/>,
      },
      {
        path: "posts/edit/:id",
        element: <EditPost/>,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

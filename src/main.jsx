import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayOut from './Components/MainLayOut'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import Register from './Pages/Register';
import AddPlant from './Pages/addPlant';
import ErrorPage from './Pages/errorPage';
import Authprovider from './Authentication With FireBase/AuthProvider';
import PrivateRoute from './Authentication With FireBase/PrivateRoute';
import AllPlants from './Pages/AllPlants';
import PlantsDetails from './Pages/plantsDetails';
import MyPlants from './MyPlants';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path:'/register',
        element: <Register></Register>
      },
      {
        path: "/add-plant",
        element: <PrivateRoute>
          <AddPlant></AddPlant>
        </PrivateRoute>,
      },
      {
        path:'/*',
        element:<ErrorPage></ErrorPage>
      },
      {
        path: "/plants",
        loader: async () => {
          return fetch('http://localhost:3000/plants')
        },
        element: <AllPlants></AllPlants>
      },
      {
        path: "/plants/:id",
        loader: async ({ params }) => {
          return fetch(`http://localhost:3000/plants/${params.id}`)
        },
        element: <PrivateRoute>
          <PlantsDetails></PlantsDetails>
        </PrivateRoute>,
      },
      {
        path: "/my-plants",
        loader: async () => {
          return fetch('http://localhost:3000/plants')
        },
        element: <PrivateRoute>
          <MyPlants></MyPlants>
        </PrivateRoute>,
      }
      
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
      </Authprovider>
  </StrictMode>,
)

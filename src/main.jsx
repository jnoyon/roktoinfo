import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import FindBlood from './pages/FindBlood';
import More from './pages/More';
import Login from './auth/Login';
import AddDonor from './dashboard/AddDonor';
import DonorDetails from './pages/DonorDetails';
import { BloodDonorsProvider } from './context/BloodDonorsContext';
import APositive from './bloodgroups/APositive';
import About from './pages/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/find",
        element: <FindBlood></FindBlood>
      },
      {
        path: "/more",
        element: <More></More>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <More></More>
      },
      {
        path: "/add",
        element: <AddDonor></AddDonor>
      },
      {
        path: "/donor",
        element: <DonorDetails></DonorDetails>
      },
      {
        path: "/ap",
        element: <APositive></APositive>
      },
      {
        path: "/about",
        element: <About></About>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BloodDonorsProvider>
      <RouterProvider router={router} />
    </BloodDonorsProvider>
  </StrictMode>
)

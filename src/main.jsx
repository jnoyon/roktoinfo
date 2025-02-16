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
import Login from './auth/Login';
import AddDonor from './dashboard/AddDonor';
import DonorDetails from './pages/DonorDetails';
import { BloodDonorsProvider } from './context/BloodDonorsContext';
import About from './pages/About';
import Dashboard from './dashboard/Dashboard';
import AuthProvider from './firebase/AuthProvider';
import Register from './auth/Register';
import PrivateRoute from './auth/PrivateRoute';
import BloodRequest from './pages/BloodRequest';
import BloodGroupDonors from './pages/BloodGroupDonors';
import { HelmetProvider } from 'react-helmet-async';
import Terms from './pages/Terms';
import Moderators from './pages/Moderators';
import Organizatons from './pages/Organizatons';
import AddOrganization from './components/organization/AddOrganization';
import { OrganizationProvider } from './context/OrganizationProvider';
import OrganizationDetails from './components/organization/OrganizationDetails';
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
        path: "/request",
        element: <BloodRequest></BloodRequest>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/add",
        element: <PrivateRoute> <AddDonor></AddDonor> </PrivateRoute>
      },
      {
        path: "/:id",
        element: <DonorDetails></DonorDetails>,
        loader: ({ params }) => fetch(`https://roktoinfo-server.vercel.app/donors/${params.id}`)
      },
      {
        path: "/org/:id",
        element: <OrganizationDetails></OrganizationDetails>,
        loader: ({ params }) => fetch(`https://roktoinfo-server.vercel.app/organizations/${params.id}`)
      },
      {
        path: "/group/:group",
      element: <BloodGroupDonors></BloodGroupDonors>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/terms",
        element: <Terms></Terms>
      },
      {
        path: "/organizations",
        element: <Organizatons></Organizatons>
      },
      {
        path: "/support",
        element:  <Moderators></Moderators> 
      },
      {
        path: "/dashboard",
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>
      },
      {
        path: "/add-org",
        element: <PrivateRoute> <AddOrganization></AddOrganization> </PrivateRoute>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BloodDonorsProvider>
      <AuthProvider>
        <OrganizationProvider>
          <HelmetProvider>
             <RouterProvider router={router} />
          </HelmetProvider>
        </OrganizationProvider>
      </AuthProvider>
    </BloodDonorsProvider>
  </StrictMode>
)

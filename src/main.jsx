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
import EditPage from './dashboard/EditPage';
import UserProvider from './context/UserProvider';
import DashboardHome from './dashboard/DashboardHome';
import MyDonors from './dashboard/MyDonors';
import Profile from './dashboard/Profile';
import Donors from './pages/Donors';
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
        path: "/:id",
        element: <DonorDetails></DonorDetails>,
        loader: ({ params }) => fetch(`https://roktoinfo-server.vercel.app/donors/${params.id}`)
      },
      {
        path: "edit/:id",
        element: <EditPage></EditPage>,
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
        path: "/donors",
        element:  <Donors></Donors>
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute> <DashboardHome></DashboardHome> </PrivateRoute>
      },
      {
        path: "/dashboard/add-org",
        element: <PrivateRoute> <AddOrganization></AddOrganization> </PrivateRoute>
      },
      {
        path: "/dashboard/add",
        element: <PrivateRoute> <AddDonor></AddDonor> </PrivateRoute>
      },
      {
        path: "/dashboard/my-donors",
        element: <PrivateRoute> <MyDonors></MyDonors> </PrivateRoute>
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoute> <Profile></Profile> </PrivateRoute>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BloodDonorsProvider>
      <AuthProvider>
        <OrganizationProvider>
          <HelmetProvider>
             <UserProvider>
              <RouterProvider router={router} />
             </UserProvider>
          </HelmetProvider>
        </OrganizationProvider>
      </AuthProvider>
    </BloodDonorsProvider>
  </StrictMode>
)

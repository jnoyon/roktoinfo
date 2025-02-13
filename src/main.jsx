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
import Credit from './pages/Credit';
import Dashboard from './dashboard/Dashboard';
import AuthProvider from './firebase/AuthProvider';
import Register from './auth/Register';
import PrivateRoute from './auth/PrivateRoute';
import BloodRequest from './pages/BloodRequest';

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
        path: "/ap",
        element: <APositive></APositive>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/credit",
        element: <Credit></Credit>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BloodDonorsProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </BloodDonorsProvider>
  </StrictMode>
)

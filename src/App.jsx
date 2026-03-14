import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./contexts/auth/AuthProvider";
import PublicRoute from "./layouts/PublicRoute";
import ProtectedRoute from "./layouts/ProtectedRoute";
import AddItems from "./pages/AddItems";
import ViewCategories from "./pages/ViewCategories";
import AddCategories from "./pages/AddCategories";
import ViewItems from "./pages/ViewItems";
import ViewArtisans from "./pages/ViewArtisans";
import AddArtisans from "./pages/AddArtisans";
import Settings from "./pages/Settings";
import InterestedListing from "./pages/InterestedListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "categories/list",
        element: <ViewCategories />,
      },
      {
        path: "categories/add",
        element: <AddCategories />,
      },
      {
        path: "items/list",
        element: <ViewItems />,
      },
      {
        path: "items/add",
        element: <AddItems />,
      },
      {
        path: "artisans/list",
        element: <ViewArtisans />,
      },
      {
        path: "artisans/add",
        element: <AddArtisans />,
      },
      {
        path: "interested",
        element: <InterestedListing />,
      },
      {
        path: "Settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <div className="p-8 text-center">404 - Page Not Found</div>,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

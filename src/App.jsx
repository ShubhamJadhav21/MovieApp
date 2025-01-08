import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Signup from "./Components/Signup/Signup";
import ValidateOtp from "./Components/ValidateOtp/ValidateOtp";
import Home from "./pages/Home/Home";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Movieplaying from "./Components/Movieplaying/Movieplaying";

// Layout with Navigation
function WithNavigationLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

// Layout without Navigation
function WithoutNavigationLayout() {
  return <Outlet />;
}

export default function App() {
  const router = createBrowserRouter([
    // Routes with navigation
    {
      path: "/",
      element: <WithNavigationLayout />,
      children: [
        { index: true, element: <Home /> }, // Home page
      ],
    },
    // Routes without navigation
    {
      path: "movie/:id",
      element: <WithoutNavigationLayout />, // Movie details page
      children: [
        { index: true, element: <MovieDetails /> },
      ],
    },
    {
      path: "/signin",
      element: <WithoutNavigationLayout />,
      children: [{ index: true, element: <SignIn /> }],
    },
    {
      path: "/signup",
      element: <WithoutNavigationLayout />,
      children: [{ index: true, element: <Signup /> }],
    },
    {
      path: "/otp-validation",
      element: <WithoutNavigationLayout />,
      children: [{ index: true, element: <ValidateOtp /> }],
    },
    {
      path:"/movie-playing",
      element:<WithoutNavigationLayout/>,
      children:[{index:true,element:<Movieplaying/>}]
    }
  ]);

  return <RouterProvider router={router} />;
}

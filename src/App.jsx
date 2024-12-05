import React from "react";
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Signup from "./Components/Signup/Signup";
import ValidateOtp from "./Components/ValidateOtp/ValidateOtp"; // Corrected import statement

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

// Special layout for pages without navigation
function NoNavigationLayout() {
  return <Outlet />;
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // Add your other routes here
      ],
    },
    {
      path: "/signin",
      element: <NoNavigationLayout />,
      children: [{ index: true, element: <SignIn /> }],
    },
    {
      path: "/signup",
      element: <NoNavigationLayout />,
      children: [{ index: true, element: <Signup /> }],
    },
    {
      path: "/otp-validation", // Add route for OTP validation
      element: <NoNavigationLayout />,
      children: [{ index: true, element: <ValidateOtp /> }], // Correct component name
    },
  ]);

  return <RouterProvider router={router} />;
}

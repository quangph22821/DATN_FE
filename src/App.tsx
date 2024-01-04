import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import UserLayout from "./components/layout/UserLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },

 
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

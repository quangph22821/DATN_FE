import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import UserLayout from "./components/layout/UserLayout";
import Signup from "./pages/signup/signup";
import AboutPage from "./pages/about";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {path:"/signup",element:<Signup/>},
      {path:"/about",element:<AboutPage/>}
    ],
  },

  
 
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

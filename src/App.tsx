import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import UserLayout from "./components/layout/UserLayout";
import AboutPage from "./pages/about";
import DetailPage from "./pages/detail";
import ShopPage from "./pages/shop";
import CartPage from "./pages/cart";
import BillPage from "./pages/bill";
import ContactPage from "./pages/contact";
import CheckoutPage from "./pages/checkout";
import ProfilePage from "./pages/profile";
// import Signup from "./pages/signup/signup";
import Signin from "./pages/signin/signin";
import HistoryPage from "./pages/history";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/detail/:id", element: <DetailPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/bill", element: <BillPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/signin", element: <Signin /> },
      // { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/bills/user/:id", element: <HistoryPage /> },
    ],
  },

  
 
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

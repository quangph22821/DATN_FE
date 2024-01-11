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
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./admin/dashboard";
import ListUsersPage from "./admin/users/listUsers";
import Signup from "./pages/signup/signup";
import ListMaterialPage from "./admin/material/listMaterial";
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
      { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/bills/user/:id", element: <HistoryPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <DashboardPage /> },

      // Products
      // { path: "/admin/listPro", element: <ListProductsPage /> },
      // { path: "/admin/createPro", element: <CreateProducts /> },
      // { path: "/admin/updatePro/:id", element: <UpdateProducts /> },

      // Category
      // { path: "/admin/listCate", element: <ListCategoryPage /> },
      // { path: "/admin/createCate", element: <CreateCategory /> },
      // { path: "/admin/updateCate/:id", element: <UpdateCategory /> },

      // Origin
      // { path: "/admin/listOri", element: <ListOriginPage /> },
      // { path: "/admin/createOri", element: <CreateOrigin /> },
      // { path: "/admin/updateOri/:id", element: <UpdateOrigin /> },

      // Material
      { path: "/admin/listMate", element: <ListMaterialPage /> },
      // { path: "/admin/createMate", element: <CreateMaterial /> },
      // { path: "/admin/updateMate/:id", element: <UpdateMaterial /> },

      // Cart
      // { path: "/admin/listCart", element: <ListCartPage /> },

      // Bill
      // { path: "/admin/listBill", element: <ListBillPage /> },
      // { path: "/admin/updateBill/:id", element: <UpdateBill /> },

      // Users
      { path: "/admin/listUser", element: <ListUsersPage /> },

      // Comment
      // { path: "/admin/listComment", element: <ListCommentPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

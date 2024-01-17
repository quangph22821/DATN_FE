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
import Signin from "./pages/signin/signin";
import HistoryPage from "./pages/history";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./admin/dashboard";
import ListUsersPage from "./admin/users/listUsers";
import Signup from "./pages/signup/signup";
import ListCategoryPage from "./admin/category/listCategory";
import CreateCategory from "./admin/category/create";
import UpdateCategory from "./admin/category/update";
import ListOriginPage from "./admin/origin/listOrigin";
import CreateOrigin from "./admin/origin/create";
import UpdateOrigin from "./admin/origin/update";
import ListMaterialPage from "./admin/material/listMaterial";
import CreateMaterial from "./admin/material/create";
import UpdateMaterial from "./admin/material/update";
import ListProductsPage from "./admin/products/listProduct";
import CreateProducts from "./admin/products/createProduct";
import UpdateProducts from "./admin/products/updateProduct";
import ForgotPassword from "./pages/forgotpassword/forgotpassword";
import UpdatePassword from "./pages/updateUser";
import NotFoundPage from "./pages/notFound";
import UpdateBill from "./admin/bill/updateBill";
import ListBillPage from "./admin/bill/listBill";
import ListCommentPage from "./admin/comment/listComment";
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
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/bills/updatePassword/:id", element: <UpdatePassword /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <DashboardPage /> },
      
      // Products
      { path: "/admin/listPro", element: <ListProductsPage /> },
      { path: "/admin/createPro", element: <CreateProducts /> },
      { path: "/admin/updatePro/:id", element: <UpdateProducts /> },
      
      // Category
      { path: "/admin/listCate", element: <ListCategoryPage /> },
      { path: "/admin/createCate", element: <CreateCategory /> },
      { path: "/admin/updateCate/:id", element: <UpdateCategory /> },
      
      // Origin
      { path: "/admin/listOri", element: <ListOriginPage /> },
      { path: "/admin/createOri", element: <CreateOrigin /> },
      { path: "/admin/updateOri/:id", element: <UpdateOrigin /> },
      
      // Material
      { path: "/admin/listMate", element: <ListMaterialPage /> },
      { path: "/admin/createMate", element: <CreateMaterial /> },
      { path: "/admin/updateMate/:id", element: <UpdateMaterial /> },
      
      // Cart
      // { path: "/admin/listCart", element: <ListCartPage /> },
      
      // Bill
      { path: "/admin/listBill", element: <ListBillPage /> },
      { path: "/admin/updateBill/:id", element: <UpdateBill /> },
      
      // Users
      { path: "/admin/listUser", element: <ListUsersPage /> },
      
      // Comment
      { path: "/admin/listComment", element: <ListCommentPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

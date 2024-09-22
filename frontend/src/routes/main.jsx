import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/Allusers';
import CategoryProduct from '../pages/CategoryProduct';
import AllProduct from '../pages/AllProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import Success from '../pages/success';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';
import AllOrder from '../pages/AllOrder';



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "Forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "Sign-up",
                element: <SignUp />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'success',
                element: <Success />
            },
            {
                path: 'cancel',
                element: <Cancel />
            },
            {
                path: 'search',
                element: <SearchProduct />
            },
            {
                path: 'order',
                element: <OrderPage />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProduct />
                    },
                    {
                        path: "all-orders",
                        element: <AllOrder />
                    }
                ]
            },
        ]
    }
])

export default router;

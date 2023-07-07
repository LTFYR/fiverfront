import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Add from "./pages/add/Add";
import Categories from "./pages/categories/Categories";
import Category from "./pages/category/Category";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import OwnCategory from "./pages/owncategory/OwnCategory";
import Orders from "./pages/orders/Orders";
import Footer from "./components/Footer/Footer";
import "./main.scss";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import Success from "./pages/success/Success";
import Payment from "./pages/payment/Payment";
import Mobile from "./components/MobileNavbar/Mobile";

function App() {
  const client = new QueryClient();
  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={client}>
          <Navbar />
          <div className="mobile-navbar">
            <Mobile />
          </div>
          <Outlet />
          <Footer />
          {/* <ReactQueryDevtools initialIsOpen /> */}
        </QueryClientProvider>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gigs",
          element: <Categories />,
        },
        {
          path: "/category/:id",
          element: <Category />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/pay/:id",
          element: <Payment />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/owncategory",
          element: <OwnCategory />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

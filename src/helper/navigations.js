import { Navigate } from "react-router-dom";

import HomePage from "../components/HomePage/HomePage";
import ProductList from "../components/ProductList/ProductList";
import ProductPage from "../components/ProductPage/ProductPage";
import Cart from "../components/Cart/Cart";
import Categories from "../components/Categories/Categories";
import ComingSoon from "../components/ComingSoon/ComingSoon";
import Checkout from "../components/Checkout/Checkout";
import Payment from "../components/Payment/Payment";
import OrderConfirmation from "../components/OrderConfirmation/OrderConfirmation";
import Orders from "../components/Orders/Orders";
import AuthGuard from "../auth/AuthGuard";


export const nav = [
     { path:     "/",                        element: <HomePage />,                                  shouldBeAuthenticated: false  },
     { path:     "/products/:value/:key",    element: <ProductList />,                               shouldBeAuthenticated: false  },
     { path:     "/product/:id",             element: <ProductPage />,                               shouldBeAuthenticated: false  },
     { path:     "/cart",                    element: <Cart />,                                      shouldBeAuthenticated: false  },
     { path:     "/category",                element: <Categories />,                                shouldBeAuthenticated: false  },
     { path:     "/comingSoon",              element: <ComingSoon />,                                shouldBeAuthenticated: false  },
     { path:     "/checkout",                element: <AuthGuard><Checkout /></AuthGuard>,           shouldBeAuthenticated: true  },
     { path:     "/paymentPage",             element: <AuthGuard><Payment /></AuthGuard>,            shouldBeAuthenticated: true  },
     { path:     "/orderConfirm",            element: <AuthGuard><OrderConfirmation /></AuthGuard>,  shouldBeAuthenticated: true  },
     { path:     "/orders",                  element: <AuthGuard><Orders /></AuthGuard>,             shouldBeAuthenticated: true  },
     { path:     "/login",                   element: <AuthGuard>Sign In</AuthGuard>,                shouldBeAuthenticated: true  },
     { path:     "*",                        element: <Navigate to="/comingSoon" />,                 shouldBeAuthenticated: false  },
]


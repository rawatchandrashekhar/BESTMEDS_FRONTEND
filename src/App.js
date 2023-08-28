import React from "react";
import Categories from "./Administrator/Categories"
import DisplayAllCategories from "./Administrator/DisplayAllCategories"
import SubCategories from "./Administrator/SubCategories"
import DisplayAllSubcategories from "./Administrator/DisplayAllSubcategories"
import Brands from "./Administrator/Brands"
import DisplayAllBrands from "./Administrator/DisplayAllBrands"
import Products from "./Administrator/Products"
import DisplayAllProducts from "./Administrator/DisplayAllProducts"
import ProductImages from "./Administrator/ProductImages";
import AdminLogin from "./Administrator/AdminLogin"
import AdminDashboard from "./Administrator/AdminDashboard"
import Header from "./UserInterface/Header"
import Home from "./UserInterface/Home"
import Banner from "./Administrator/Banner"
import ShoppingCartComponent from "./UserInterface/ShoppingCartComponent";
import ProductList from "./UserInterface/ProductList"
import ProductView from "./UserInterface/ProductView"
import SignIn from "./UserInterface/SignIn"
import OrderSummary from "./UserInterface/OrderSummary";
import SignUp from "./UserInterface/SignUp"
import OrderSummaryReview from "./UserInterface/OrderSummaryReview";
import FinalOrderSummary from "./UserInterface/FinalOrderSummary"
import PaymentGateway from "./UserInterface/PaymentGateway";

import {BrowserRouter as Router,Route,Routes} from "react-router-dom"

function App(props) {
  return (
    <div>
     <Router>
       <Routes>
         <Route history={props.history} element={<Categories/>} path="/categories" />
         <Route history={props.history} element={<DisplayAllCategories/>} path="/displayallcategories" />
         <Route history={props.history} element={<SubCategories/>} path="/subcategories" />
         <Route history={props.history} element={<DisplayAllSubcategories/>} path="/displayallsubcategories" />
         <Route history={props.history} element={<Brands/>} path="/brands" />
         <Route history={props.history} element={<DisplayAllBrands/>} path="/displayallbrands" />
         <Route history={props.history} element={<Products/>} path="/products" />
         <Route history={props.history} element={<DisplayAllProducts/>} path="/displayallproducts" />
         <Route history={props.history} element={<ProductImages/>} path="/productimages" />
         <Route history={props.history} element={<AdminLogin/>} path="/adminlogin" />
         <Route history={props.history} element={<AdminDashboard/>} path="/admindashboard" />
         <Route history={props.history} element={<Header/>} path="/header" />
         <Route history={props.history} element={<Home/>} path="/home" />
         <Route history={props.history} element={<Banner/>} path="/banner" />
         <Route history={props.history} element={<ShoppingCartComponent/>} path="/shoppingcartcomponent" />
         <Route history={props.history} element={<ProductList/>} path="/productlist" />
         <Route history={props.history} element={<ProductView/>} path="/productview" />
         <Route history={props.history} element={<SignIn/>} path="/signin" />
         <Route history={props.history} element={<OrderSummary/>} path="/ordersummary" />
         <Route history={props.history} element={<SignUp/>} path="/signup" />
         <Route history={props.history} element={<OrderSummaryReview/>} path="/ordersummaryreview" />
         <Route history={props.history} element={<FinalOrderSummary/>} path="/finalordersummary" />
         <Route history={props.history} element={<PaymentGateway/>} path="/paymentgateway" />
       </Routes>
     </Router>
    </div>
  );
}

export default App;

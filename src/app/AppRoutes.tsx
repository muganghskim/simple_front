import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import Notice from "../pages/Notice/Notice";
import About from "../pages/About/About";
import Error from "../pages/Error/Error";
import Header from "../pages/Common/Header";
import ProductDetail from "../pages/Product/ProductDetail";
import ProductInsert from "../pages/Admin/ProductInsert";
import Delivery from "../pages/Product/Delivery";
import SignIn from "../pages/User/SignIn";
import SignUp from "../pages/User/SignUp";
import Profile from "../pages/User/Profile";
import CategoryInsert from "../pages/Admin/CategoryInsert";
import NoticeInsert from "../pages/Admin/NoticeInsert";
import Expense from "../pages/Admin/Expense";
import Admin from "../pages/Admin/Admin";
import AdminLogin from "../pages/Admin/AdminLogin";
import Inven from "../pages/Admin/Inven";
import Profit from "../pages/Admin/Profit";
import LoginSuccess from "../pages/User/LoginSuccess";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/about" element={<About />} />
        <Route path="/header" element={<Header />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/error" element={<Error />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/inven" element={<Inven />} />
        <Route path="/admin/profit" element={<Profit />} />
        <Route path="/admin/product/insert" element={<ProductInsert />} />
        <Route path="/admin/category/insert" element={<CategoryInsert />} />
        <Route path="/admin/expense/insert" element={<Expense />} />
        <Route path="/admin/notice/insert" element={<NoticeInsert />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loginSuccess" element={<LoginSuccess />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:category" element={<Menu />} />
        <Route path="/donaition" element={<Donaition />} />
        <Route path="/loginSuccess" element={<LoginSuccess />} />
        <Route path="/admin" element={<Admin />} /> */}
        {/*  추가적인 라우트를 이곳에 작성해주세요  */}
      </Routes>
     
    </BrowserRouter>
  );
}

export default AppRoutes;

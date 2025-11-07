import "./styles.css";
//@ts-ignore
import Layout from "./Layout";
//@ts-ignore
import Login from "./public/login";
//@ts-ignore
import Register from "./public/register";


// @ts-ignore
import ListProducts_SP from "./ListProducts_SP.js";


//@ts-ignore
import ProductDetail from "./ProductDetail";

//@ts-ignore
import Admindashboard from "./private/adminHome";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  // return <Home />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListProducts_SP />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="detail/:id" element={<ProductDetail />} />
        </Route>
          <Route path="admin" element={<Admindashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

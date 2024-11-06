import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ProductList from "../components/productlist";
import AddProduct from "../components/addproduct";
import EditProduct from "../components/editproduct";

const Display = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
        <div className="sidebar">
            <div>
                <NavLink
                    to="/products"
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                    Quản lý hàng hóa
                </NavLink>
            </div>
          </div>

          <div className="main-content">
            <Routes>
              <Route path="/products" element={<ProductList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default Display;

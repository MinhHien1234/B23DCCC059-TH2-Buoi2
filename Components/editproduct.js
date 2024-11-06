import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../redux/productsSlice";

const EditProduct = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.find((product) => product.id === parseInt(id))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, name, price }));
    navigate("/products");
  };

  const formStyles = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  };

  const inputStyles = {
    display: "block",
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd"
  };

  const buttonStyles = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  const backBtnStyles = {
    marginTop: "10px",
    backgroundColor: "#28a745"
  };

  return (
    <div style={formStyles}>
      <h2>Chỉnh Sửa Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyles}
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyles}
        />
        <button type="submit" style={buttonStyles}>
          Lưu Thay Đổi
        </button>
      </form>
      <button style={{ ...buttonStyles, ...backBtnStyles }} onClick={() => navigate("/products")}>
        Quay Lại
      </button>
    </div>
  );
};

export default EditProduct;

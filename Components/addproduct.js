import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../Redux/productsSlice";

const AddProduct = () => {
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };
    dispatch(addProduct(newProduct));
    navigate("/products");
  };

  const styles = {
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    backButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
   
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",}}>
      <h2 style={{
         textAlign: "center",
         marginBottom: "20px",
      }}>Thêm Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Thêm hàng hóa</button>
      </form>
      <button style={styles.backButton} onClick={() => navigate("/products")}>
        Quay Lại
      </button>
    </div>
  );
};

export default AddProduct;

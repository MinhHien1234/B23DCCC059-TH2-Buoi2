import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productsSlice";
import { Link, useNavigate } from "react-router-dom";
import SearchProduct from "./searchProduct";


const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div
      style={{
        marginLeft: "300px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Danh Sách Hàng Hóa</h2>
  
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <SearchProduct onSearch={setSearchQuery} />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/add-product")}
        >
          Thêm Hàng Hóa
        </button>
      </div>
  
      {currentProducts.length > 0 ? (
        currentProducts.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span>
              {product.name} - {product.price} VND
            </span>
            <div>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(deleteProduct(product.id))}
              >
                Xóa
              </button>
              <Link to={`/edit-product/${product.id}`}>
                <button
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Chỉnh sửa
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>Không tìm thấy hàng hóa nào!</p>
      )}
  
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            padding: "8px 16px",
            marginRight: "5px",
            backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Trang trước
        </button>
        <span style={{ margin: "0 10px", fontSize: "16px" }}>
          Trang {currentPage} / {totalPages}
        </span>
        <button
          style={{
            padding: "8px 16px",
            marginLeft: "5px",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );  
};

export default ProductList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setListProduct(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  // Cập nhật filteredProducts khi filterCategory thay đổi
  useEffect(() => {
    if (filterCategory === "all") {
      setFilteredProducts(listProduct);
    } else {
      setFilteredProducts(
        listProduct.filter((p) => p.category === filterCategory)
      );
    }
  }, [filterCategory, listProduct]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>

      {/* Combobox lọc */}
      <div style={{ marginBottom: "15px", textAlign: "right" }}>
        <label htmlFor="filter" style={{ marginRight: "10px", fontWeight: "bold" }}>
          Lọc theo loại:
        </label>
        <select
          id="filter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: "5px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value="all">Tất cả</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/detail/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <h4 style={{ margin: "10px 0 5px", fontSize: "15px" }}>
              {p.title}
            </h4>
            <p style={{ color: "#e63946", fontWeight: "bold", margin: "0" }}>
              {p.price.toLocaleString("vi-VN")}₫
            </p>
            <div style={{ marginTop: "5px" }}>
              <small style={{ color: "#555", display: "block" }}>
                ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
              </small>
              <p
                className="da-ban"
                style={{
                  backgroundColor: "#7110c2",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  display: "inline-block",
                  marginTop: "5px",
                }}
              >
                Đã bán: {p.sold || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;

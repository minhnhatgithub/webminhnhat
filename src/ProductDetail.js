import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Function } from "./config/function";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const addProduct = () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      Function.makeToast("Vui lòng đăng nhập để thêm sản phẩm", "warning");
      return;
    }
    Function.makeToast("Đã thêm vào giỏ hàng!", "success");
  };

  if (!product) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Đang tải...</p>;
  }

  const priceOld = product.price_old || product.price * 2; // ví dụ giá cũ
  const priceNew = product.price;

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ← Quay lại danh sách
      </button>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* Ảnh sản phẩm */}
        <div
          style={{
            flex: "1 1 350px",
            maxWidth: "400px",
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", objectFit: "cover" }}
          />
          <button
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              fontSize: "24px",
            }}
          >
            ▶
          </button>
        </div>

        {/* Thông tin sản phẩm */}
        <div style={{ flex: "1 1 400px" }}>
          <h2>{product.title}</h2>

          <div style={{ margin: "10px 0", fontSize: "1.5rem" }}>
            <span style={{ textDecoration: "line-through", color: "#888", marginRight: "10px" }}>
              {priceOld.toLocaleString("vi-VN")}₫
            </span>
            <span style={{ color: "#7110c2", fontWeight: "bold" }}>
              {priceNew.toLocaleString("vi-VN")}₫
            </span>
          </div>

          {/* Số lượng và nút */}
          <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "6px" }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ padding: "5px 12px", cursor: "pointer" }}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                style={{ width: "40px", textAlign: "center", border: "none" }}
              />
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{ padding: "5px 12px", cursor: "pointer" }}
              >
                +
              </button>
            </div>
            <button
              onClick={addProduct}
              style={{
                backgroundColor: "#7110c2",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              style={{
                backgroundColor: "#5cb85c",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Mua ngay
            </button>
          </div>

          <p style={{ marginTop: "10px", color: "#555" }}>
            ⭐ {product.rating_rate} ({product.rating_count} đánh giá)
          </p>

          <p style={{ marginTop: "15px", color: "#333" }}>{product.description}</p>

          {/* So sánh, lưu, chia sẻ */}
          <div style={{ marginTop: "20px", display: "flex", gap: "15px", alignItems: "center" }}>
            <span style={{ cursor: "pointer" }}>↔ So sánh</span>
            <span style={{ cursor: "pointer" }}>♡ Lưu vào yêu thích</span>
            <span style={{ marginLeft: "auto" }}>Chia sẻ: f X P in t</span>
          </div>

          <div style={{ marginTop: "10px", backgroundColor: "#f3e8ff", padding: "8px", borderRadius: "6px" }}>
            👁 14 Số khách đang cùng xem sản phẩm này!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

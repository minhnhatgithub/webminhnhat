import React, { useEffect, useState } from "react";
import "../css/adminDashBoard.css";
import { Function } from "../config/function";
import { supabase } from "../supabasePrivate";

export default function Admindashboard() {
    const [userCount, setUserCount] = useState(null);
    const [productCount, setProductCount] = useState(null);
    const [products, setProducts] = useState();
    const loadDashboardData = async () => {
        try {
            const { count: uCount, error: userError } = await supabase
                .from("user")
                .select("*", { count: "exact", head: true });
            if (userError) throw userError;
            setUserCount(uCount || 0);
            const { data: pData, count: pCount, error: productError } = await supabase
                .from("product1")
                .select("*", { count: "exact" });
            if (productError) throw productError;

            setProductCount(pCount || 0);
            setProducts(pData || []);
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu dashboard:", err);
        }
    };
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
        if (!confirmDelete) return;

        const { error } = await supabase.from("product1").delete().eq("id", id);
        if (error) {
            Function.makeToast("Xóa thất bại!", "error");
        } else {
            Function.makeToast("Đã xóa sản phẩm!", "success");
            setProducts((prev) => prev.filter((p) => p.id !== id));
            loadDashboardData();
        }
    };

    useEffect(() => {
        if (!Function.isAdmin()) {
            window.location.href = Function.base_Url();
            return;
        }
        loadDashboardData();
    }, []);

    return (
        <div className="dashboard-page">
            <div className="top-bar">
                <button
                    className="home-btn"
                    onClick={() => (window.location.href = Function.base_Url())}
                >
                    ← Trang chủ
                </button>
            </div>

            {/* ========== HEADER CARDS ========== */}
            <div className="dashboard-container">
                <div className="card">
                    <div className="icon-wrapper">
                        <i className="fa fa-users"></i>
                    </div>
                    <div className="info">
                        <span className="label">Thành viên</span>
                        <h2 className="value">
                            {userCount !== null ? userCount : "Đang chờ..."}
                        </h2>
                    </div>
                    <div className="change positive">
                        <i className="fa fa-arrow-up"></i> 11.01%
                    </div>
                </div>

                <div className="card">
                    <div className="icon-wrapper">
                        <i className="fa fa-box"></i>
                    </div>
                    <div className="info">
                        <span className="label">Sản phẩm</span>
                        <h2 className="value">
                            {productCount !== null ? productCount : "Đang chờ..."}
                        </h2>
                    </div>
                    <div className="change positive">
                        <i className="fa fa-arrow-up"></i> 8.34%
                    </div>
                </div>
            </div>

            {/* ========== PRODUCT TABLE ========== */}
            <div className="table-container">
                <h2 className="table-title">Danh sách sản phẩm</h2>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th style={{ width: "40%" }}>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Ảnh</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((p, i) => (
                                <tr key={p.id}>
                                    <td>{i++}</td>
                                    <td>{p.title}</td>
                                    <td>{p.price.toLocaleString("vi-VN")}₫</td>
                                    <td><img src={p.image} style={{ width: "20%" }} alt="" srcset="" /></td>
                                    <td><button type="button"
                                        onClick={() => deleteProduct(p.id)}
                                        style={{ color: "#ffff", backgroundColor: "#dc3545", border: "none", borderRadius: "15px", width: "50px", height: "30px" }}
                                    >Xóa</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center" }}>
                                    Đang tải sản phẩm...
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

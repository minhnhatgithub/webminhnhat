import React from "react";
import "../css/adminDashBoard.css";
import { Function,Encryptor } from "../config/function";
export default function Admindashboard() {
    const products = [
        { id: 1, name: "Iphone 15 Pro", price: "$999", stock: 32, status: "In Stock" },
        { id: 2, name: "Samsung S24 Ultra", price: "$899", stock: 12, status: "Low Stock" },
        { id: 3, name: "Xiaomi 14", price: "$699", stock: 0, status: "Out of Stock" },
        { id: 4, name: "Oppo Reno 12", price: "$499", stock: 25, status: "In Stock" },
    ];

    console.log(Encryptor.encrypt("lukki"));
    return (

        <div className="dashboard-page">
            <div class="top-bar">
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
                        <span className="label">Customers</span>
                        <h2 className="value">3,782</h2>
                    </div>
                    <div className="change positive">
                        <i className="fa fa-arrow-up"></i> 11.01%
                    </div>
                </div>
                <div className="card">
                    <div className="icon-wrapper">
                        <i className="fa fa-users"></i>
                    </div>
                    <div className="info">
                        <span className="label">Customers</span>
                        <h2 className="value">3,782</h2>
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
                        <span className="label">Orders</span>
                        <h2 className="value">5,359</h2>
                    </div>
                    <div className="change negative">
                        <i className="fa fa-arrow-down"></i> 9.05%
                    </div>
                </div>
            </div>

            {/* ========== PRODUCT TABLE ========== */}
            <div className="table-container">
                <h2 className="table-title">Danh sách sản phẩm</h2>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Tồn kho</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{p.stock}</td>
                                <td
                                    className={
                                        p.status === "In Stock"
                                            ? "status in-stock"
                                            : p.status === "Low Stock"
                                                ? "status low-stock"
                                                : "status out-stock"
                                    }
                                >
                                    {p.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
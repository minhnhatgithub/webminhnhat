import React, { useEffect, useState } from "react";
import "../css/adminDashBoard.css";
import { Function } from "../config/function";
import { supabase } from "../supabasePrivate";
import Swal from "sweetalert2";
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

    const addProduct = async () => {
        if (!Function.isAdmin()) {
            window.location.href = Function.base_Url();
            return;
        }
        Swal.fire({
            title: "Thêm sản phẩm mới",
            html: `
      <input id="productName" class="swal2-input" placeholder="Tên sản phẩm">
      <input id="productPrice" type="number" class="swal2-input" placeholder="Giá tiền (VNĐ)" min="0">
      <input id="productImage" class="swal2-input" placeholder="Đường dẫn ảnh">
      <select id="productCategory" style="
        width: 62%;
        padding: 0.625em;
        border: 1px solid #d9d9d9;
        border-radius: 0.25em;
        font-size: 1em;
        margin-top: 10px;
        color: #555;
      ">
        <option value="" disabled selected>Chọn loại sản phẩm</option>
        <option value="Thường">Thường</option>
        <option value="Việt Hóa">Việt Hóa</option>
      </select>
      <textarea style="width: 62%" id="productDescription" class="swal2-textarea" placeholder="Mô tả sản phẩm" rows="3"></textarea>
    `,
            showCancelButton: true,
            confirmButtonText: "Thêm",
            cancelButtonText: "Hủy",
            focusConfirm: false,
            preConfirm: async () => {
                try {
                    const name = document.getElementById("productName").value.trim();
                    const price = document.getElementById("productPrice").value.trim();
                    const image = document.getElementById("productImage").value.trim();
                    const category = document.getElementById("productCategory").value;
                    const description = document.getElementById("productDescription").value.trim();

                    if (!name || !price || !image || !category || !description) {
                        Swal.showValidationMessage("Vui lòng nhập đầy đủ thông tin sản phẩm!");
                        return false;
                    }

                    const { data, error } = await supabase
                        .from("product1")
                        .insert([{
                            title: name,
                            price: parseFloat(price),
                            image,
                            category,
                            description
                        }]);

                    if (error) {
                        Function.showMessage("Thêm sản phẩm thất bại!", error.message, "error");
                        return false;
                    }

                    return { name, price, image, category, description };
                } catch (error) {
                    Swal.showValidationMessage(`Lỗi khi gửi dữ liệu: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const { name, price, image, category, description } = result.value;

                Swal.fire({
                    title: "Sản phẩm đã được thêm!",
                    html: `
          <p><strong>Tên:</strong> ${name}</p>
          <p><strong>Giá:</strong> ${price} VNĐ</p>
          <p><strong>Loại:</strong> ${category}</p>
          <p><strong>Mô tả:</strong> ${description}</p>
          <img src="${image}" alt="Hình ảnh sản phẩm" style="max-width:200px; margin-top:10px; border-radius:10px;">
        `,
                    icon: "success",
                    confirmButtonText: "Đóng"
                });
                loadDashboardData();
            }
        });
    }

    const editProduct = async (id, title, cost, link, cate, about) => {
        if (!Function.isAdmin()) {
            window.location.href = Function.base_Url();
            return;
        }
        Swal.fire({
            title: "Sửa sản phẩm",
            html: `
                  <input id="idProduct" class="swal2-input" placeholder="Tên sản phẩm" value="${id}" type="hidden" >
      <input id="productName" class="swal2-input" placeholder="Tên sản phẩm" value="${title}">
      <input id="productPrice" type="number" class="swal2-input" placeholder="Giá tiền (VNĐ)" value="${cost}"min="0">
      <input id="productImage" class="swal2-input" placeholder="Đường dẫn ảnh" value="${link}">
      <select id="productCategory" style="
        width: 62%;
        padding: 0.625em;
        border: 1px solid #d9d9d9;
        border-radius: 0.25em;
        font-size: 1em;
        margin-top: 10px;
        color: #555;
      ">
        <option value="" disabled selected>Chọn loại sản phẩm</option>
 <option value="Thường" ${cate === "Thường" ? "selected" : ""}>Thường</option>
    <option value="Việt Hóa" ${cate === "Việt Hóa" ? "selected" : ""}>Việt Hóa</option>
      </select>
      <textarea style="width: 62%" id="productDescription" class="swal2-textarea"  placeholder="Mô tả sản phẩm" rows="3">${about}</textarea>
    `,
            showCancelButton: true,
            confirmButtonText: "Thêm",
            cancelButtonText: "Hủy",
            focusConfirm: false,
            preConfirm: async () => {
                try {
                    const ids = document.getElementById("idProduct").value.trim();
                    const name = document.getElementById("productName").value.trim();
                    const price = document.getElementById("productPrice").value.trim();
                    const image = document.getElementById("productImage").value.trim();
                    const category = document.getElementById("productCategory").value;
                    const description = document.getElementById("productDescription").value.trim();

                    if (!name || !price || !image || !category || !description) {
                        Swal.showValidationMessage("Vui lòng nhập đầy đủ thông tin sản phẩm!");
                        return false;
                    }

                    const { data, error } = await supabase
                        .from("product1")
                        .update({
                            title: name,
                            price: parseFloat(price),
                            image,
                            category,
                            description
                        })
                        .eq("id", id);

                    if (error) {
                        Function.showMessage("Cập nhật thất bại!", error.message, "error");
                        return false;
                    }

                    return { name, price, image, category, description };
                } catch (error) {
                    Swal.showValidationMessage(`Lỗi khi gửi dữ liệu: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const { name, price, image, category, description } = result.value;

                Swal.fire({
                    title: "Sản phẩm đã được sửa!",
                    html: `
          <p><strong>Tên:</strong> ${name}</p>
          <p><strong>Giá:</strong> ${price} VNĐ</p>
          <p><strong>Loại:</strong> ${category}</p>
          <p><strong>Mô tả:</strong> ${description}</p>
          <img src="${image}" alt="Hình ảnh sản phẩm" style="max-width:200px; margin-top:10px; border-radius:10px;">
        `,
                    icon: "success",
                    confirmButtonText: "Đóng"
                });
                loadDashboardData();
            }
        });

    }

    const deleteProduct = async (id) => {
        if (!Function.isAdmin()) {
            window.location.href = Function.base_Url();
            return;
        }
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
                <div className="table-header">
                    <h2 className="table-title">Danh sách sản phẩm</h2>
                    <button className="add-btn" onClick={() => addProduct()}>
                        + Thêm
                    </button>
                </div>
                <hr></hr>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th style={{ width: "40%" }}>Tên sản phẩm</th>
                            <th style={{ width: "10%" }}>Giá</th>
                            <th style={{ width: "20%" }}>Ảnh</th>
                            <th style={{ width: "30%" }}>Mô tả</th>
                            <th style={{ width: "60%" }}>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((p, i) => (
                                <tr key={p.id}>
                                    <td>{i++}</td>
                                    <td>{p.title}</td>
                                    <td>{p.price.toLocaleString("vi-VN")}₫</td>
                                    <td><img src={p.image} style={{ width: "50%" }} alt="" srcset="" /></td>
                                    <td>
                                        <textarea
                                            value={p.description || ""}
                                            disabled
                                            className="desc-box"
                                            rows={3}
                                        />
                                    </td>

                                    <td><button type="button"
                                        onClick={() => deleteProduct(p.id)}
                                        style={{ color: "#ffff", backgroundColor: "#dc3545", border: "none", borderRadius: "15px", width: "50px", height: "30px" }}
                                    >Xóa</button>

                                        <button onClick={() => editProduct(p.id, p.title, p.price, p.image, p.category, p.description)} style={{ color: "#ffff", backgroundColor: "#007bff", marginLeft: "5px", border: "none", borderRadius: "15px", width: "50px", height: "30px" }} type="button" class="btn btn-outline-primary">Chỉnh</button>
                                    </td>


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

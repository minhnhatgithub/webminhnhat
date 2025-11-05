import React, { useEffect, useState } from "react";
import { Function,Encryptor } from "../config/function";
const MenuBox = () => {
  const [user, setUser] = useState(null);
  const [hoverUser, setHoverUser] = useState(false); // quản lý hover

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(Encryptor.decrypt(savedUser)));
    }
  }, []);

  return (
    <div
      className="box_menu"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        width: "100%"
      }}
    >
      {/* Search Box */}
      <div
        className="search-box"
        style={{
          flexGrow: 1,
          position: "relative",
          minWidth: "270px"
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          style={{
            width: "100%",
            height: "36px",
            padding: "0 50px 0 15px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />

        {/* Icon search dạng nút tròn */}
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#7110c2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => {
            const value = document.querySelector(".search-box input").value;
            alert("Tìm kiếm: " + value);
          }}
        >
          <i className="fa fa-search" style={{ color: "#fff", fontSize: "16px" }}></i>
        </div>
      </div>

      {/* Menu */}
      <nav id="menu" className="menu" style={{ flexShrink: 0 }}>
        <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: "15px" }}>
          {!user ? (
            <li className="icon_menu">
              <a
                href="login"
                style={{ textDecoration: "none", color: "#535961", fontWeight: "bold" }}
              >
                Đăng Nhập-Đăng Kí
              </a>
            </li>
          ) : (
            <li
              className="icon_menu"
              style={{ position: "relative" }}
              onMouseEnter={() => setHoverUser(true)}
              onMouseLeave={() => setHoverUser(false)}
            >
              <a
                href="doanh-nghiep"
                style={{ textDecoration: "none", color: "#535961", fontWeight: "bold", cursor: "pointer" }}
              >
                {user.username} - {(user.cost ?? 0).toLocaleString("vi-VN")}VNĐ
              </a>

              {/* Dropdown hiển thị khi hover */}
              {/* Dropdown hiển thị khi hover */}
              {hoverUser && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "5px 0",
                    minWidth: "220px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 999
                  }}
                >
                  {/* Nếu user.level = 1 thì hiển thị trang quản trị */}
                  {user.level === 1 && (
                    <li>
                      <a
                        href="/admin"
                        style={{
                          display: "block",
                          padding: "8px 0",
                          color: "#535961",
                          textDecoration: "none",
                          cursor: "pointer",
                          textAlign: "center",
                          whiteSpace: "nowrap"
                        }}
                      >
                        Trang Quản Trị
                      </a>
                    </li>
                  )}

                  <li>
                    <a
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                      style={{
                        display: "block",
                        padding: "8px 0",
                        color: "#535961",
                        textDecoration: "none",
                        cursor: "pointer",
                        textAlign: "center",
                        whiteSpace: "nowrap"
                      }}
                    >
                      ĐĂNG XUẤT
                    </a>
                  </li>
                </ul>
              )}

            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MenuBox;

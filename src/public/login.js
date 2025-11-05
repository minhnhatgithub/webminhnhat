import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../supabasePrivate";
import { Function,Encryptor } from "../config/function";
const Login = () => {

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      window.location.href = Function.base_Url();
    }
  }, []);



  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
    Function.makeToast("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!","warning");
    
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("username", username)
        .eq("password", Function.stringToMD5(password))
        .single(); // chỉ lấy 1 user khớp

      if (error) {
        console.error("Lỗi đăng nhập:", error.message);
            Function.makeToast("Đăng nhập thất bại!","warning");

        return;
      }

      if (!data) {
         Function.makeToast("Sai tên đăng nhập hoặc mật khẩu!","error");  
        return;
      }

      localStorage.setItem("user", Encryptor.encrypt( JSON.stringify(data))); // mã hóa thông tin 
      Function.showMessage("Thành công", "Đăng nhập thành công", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <style>
        {`


          body, html {
            margin: 0;
            padding: 0;
            font-family: "Segoe UI", Arial, sans-serif;
          }

          .login-container {
            padding-top: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .login-box {
            background: #fff;
            border-radius: 12px;
            padding: 40px 35px;
            width: 340px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            text-align: center;
          }

          .login-box h3 {
            font-size: 17px;
            color: #0073e6;
            margin-bottom: 25px;
            letter-spacing: 0.5px;
          }

          .login-box input[type="text"],
          .login-box input[type="password"] {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            margin-bottom: 15px;
            font-size: 14px;
            outline: none;
            transition: border 0.2s ease;
          }

          .login-box input[type="text"]:focus,
          .login-box input[type="password"]:focus {
            border-color: #0073e6;
          }

          .login-box label {
            display: block;
            font-size: 13px;
            color: #444;
            margin-bottom: 20px;
          }

          .login-box a {
            color: #0073e6;
            text-decoration: none;
            margin-left: 4px;
          }

          .login-box a:hover {
            text-decoration: underline;
          }

          .login-box button {
            width: 100%;
            background-color: #ff6600;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.25s;
          }

          .login-box button:hover {
            background-color: #e65c00;
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-box">
          <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            Chưa có tài khoản?
            <a href="./register">Tạo tài khoản</a>
          </label>
          <button onClick={handleLogin}>ĐĂNG NHẬP</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

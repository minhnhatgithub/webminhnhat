import React, { useState } from "react";
import { supabase } from "../supabasePrivate";
import { Function } from "../config/function";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      Function.makeToast("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!", "warning");
      return;
    } else {
      if (!Function.vaildUsername(username)) {
        Function.makeToast("Tên đăng nhập phải bắt đầu bằng chữ, dài 4–20 ký tự!", "warning");
        return;
      }
      if (!Function.vaildPassword(password)) {
        Function.makeToast("Mật khẩu phải có ít nhất 6 ký tự, gồm 1 chữ hoa và 1 số!", "warning");
        return;
      }
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("username", username)
        .single();
      if (data != null) {
        Function.showMessage("Lỗi", "Tên đăng nhập đã tồn tại trên hệ thống", "error");

        return;
      } else {
        const { data, error } = await supabase
          .from('user')
          .insert({ username: username, password: Function.stringToMD5(password), creative_day: Function.getDay(), level: '0' })
        if (error) {
          Function.showMessage("Đăng ký thất bại!", error.message, "error");
          return;
        } else {

          const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("username", username)
            .eq("password", Function.stringToMD5(password))
            .single(); // chỉ lấy 1 user khớp

          if (error) {
            console.error("Lỗi đăng nhập:", error.message);
            Function.showMessage("Đăng ký thất bại!", error.message, "error");

            return;
          }

          Function.showMessage("Thành công", "Đăng ký thành công", "success");
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/";
        }
      }
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
            font-size: 15px;
            color: #333;
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
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: #444;
            margin-bottom: 20px;
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
          <h3>ĐĂNG KÍ TÀI KHOẢN</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
          <label>
            Đã có tài khoản? <a href="./login">Đăng nhập</a>
          </label>
          <button onClick={handleRegister}>ĐĂNG KÍ</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
